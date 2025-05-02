import { useEffect, useState, useRef } from "react";
import { createPost, uploadMedia } from "../../../services/api/postServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  MediaUpload,
  MediaTypes,
  TaggedObject,
} from "../../../interfaces/postInterfaces";
import "material-icons";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Users, ChevronDown, X } from "lucide-react";
import { searchCompanies } from "@services/api/companyServices";
import { CompanyInterface } from "@interfaces/companyInterfaces";
import { searchUsers } from "@services/api/networkServices";
import { ProfileInterface } from "@interfaces/userInterfaces";

interface AddPostProps {
  onUpdate: () => void;
  onClose: () => void;
}

interface TaggedEntity {
  id: string;
  name: string;
  startIndex: number;
  endIndex: number;
  type: "user" | "company";
}

export default function PostCreate(props: AddPostProps) {
  const [newText, setNewText] = useState<string>("");
  const [newMedia, setNewMedia] = useState<MediaUpload[]>([]);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [companyOptions, setCompanyOptions] = useState<CompanyInterface[]>([]);
  const [userOptions, setUserOptions] = useState<ProfileInterface[]>([]);
  const [taggedUsers, setTaggedUsers] = useState<string[]>([]);
  const [taggedCompanies, setTaggedCompanies] = useState<string[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());

  // Tag detection state
  const [isTagging, setIsTagging] = useState<boolean>(false);
  const [tagStartIndex, setTagStartIndex] = useState<number>(-1);
  const [tagQuery, setTagQuery] = useState<string>("");
  const [showTagSuggestions, setShowTagSuggestions] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [taggedEntities, setTaggedEntities] = useState<TaggedEntity[]>([]);

  // Refs
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const tagListRef = useRef<HTMLDivElement>(null);

  const addPost = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      props.onUpdate();
      props.onClose();
    },
  });

  const mediaUpload = useMutation({
    mutationFn: uploadMedia,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Query for both companies and users when tagging
  const { data: companiesData } = useQuery({
    queryKey: ["Search companies by name", tagQuery],
    enabled: isTagging && tagQuery.length > 0,
    queryFn: () =>
      searchCompanies({
        name: tagQuery,
        values: "id, name",
      }),
  });

  const { data: userData } = useQuery({
    queryKey: ["search users by name", tagQuery],
    enabled: isTagging && tagQuery.length > 0,
    queryFn: () => searchUsers(tagQuery),
  });

  useEffect(() => {
    if (companiesData) setCompanyOptions(companiesData);
    if (userData) setUserOptions(userData);
  }, [companiesData, userData]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tagListRef.current &&
        !tagListRef.current.contains(event.target as Node)
      ) {
        setShowTagSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Monitor text input for @ symbol
  useEffect(() => {
    if (cursorPosition > 0) {
      const lastAtSymbolIndex = newText.lastIndexOf("@", cursorPosition - 1);

      // Check if @ exists and is within range of the cursor
      if (lastAtSymbolIndex !== -1) {
        const textAfterAt = newText.substring(
          lastAtSymbolIndex + 1,
          cursorPosition,
        );

        // If there's no space after @ and cursor is right after @ or inside a potential tag
        if (!textAfterAt.includes(" ") && textAfterAt.length >= 0) {
          // Start or update tagging mode
          if (!isTagging || tagStartIndex !== lastAtSymbolIndex) {
            setIsTagging(true);
            setTagStartIndex(lastAtSymbolIndex);
            setTagQuery(textAfterAt);
            setShowTagSuggestions(true);
          } else if (isTagging) {
            // Update tag query as user types
            setTagQuery(textAfterAt);
          }
        } else if (textAfterAt.includes(" ") && isTagging) {
          // User typed a space after @, stop tagging
          setIsTagging(false);
          setShowTagSuggestions(false);
        }
      } else if (isTagging) {
        // Cursor is now before any @ symbol, so definitely outside tagging mode
        setIsTagging(false);
        setShowTagSuggestions(false);
      }
    } else if (isTagging) {
      // Cursor is at position 0, definitely outside tagging mode
      setIsTagging(false);
      setShowTagSuggestions(false);
    }

    // Also check if cursor moved away from current tagging area
    if (
      isTagging &&
      (cursorPosition <= tagStartIndex ||
        cursorPosition > tagStartIndex + tagQuery.length + 2)
    ) {
      // Cursor is outside the current tag being edited
      setIsTagging(false);
      setShowTagSuggestions(false);
    }
  }, [newText, cursorPosition]);

  // Handle text change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewText(e.target.value);
    setCursorPosition(e.target.selectionStart || 0);
  };

  // Handle text area key up
  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Escape" && showTagSuggestions) {
      setShowTagSuggestions(false);
      setIsTagging(false);
    } else if (e.key === "ArrowDown" && showTagSuggestions) {
      e.preventDefault();
      // Focus on the first item in the suggestion list
      const firstItem = document.querySelector(
        ".tag-suggestion",
      ) as HTMLElement;
      if (firstItem) firstItem.focus();
    } else if (e.key === "@") {
      // Just keep tracking cursor position for @ symbol
      setCursorPosition(e.currentTarget.selectionStart || 0);
    }
  };

  // Handle company selection
  const handleSelectCompany = (company: CompanyInterface) => {
    // Add company ID to tagged companies if not already included
    if (!taggedCompanies.includes(company.id)) {
      setTaggedCompanies([...taggedCompanies, company.id]);
    }

    // Calculate where the tag text begins and ends
    const beforeTag = newText.substring(0, tagStartIndex);
    const afterTag = newText.substring(cursorPosition);

    // Create the new text with the tagged company
    const newTextValue = `${beforeTag}@${company.name} ${afterTag}`;

    // Add to tagged entities for rendering highlighted tags
    const newTaggedEntity: TaggedEntity = {
      id: company.id,
      name: company.name,
      startIndex: tagStartIndex,
      endIndex: tagStartIndex + company.name.length + 1, // +1 for @ symbol
      type: "company",
    };

    setTaggedEntities([...taggedEntities, newTaggedEntity]);

    // Update text and reset tagging state
    setNewText(newTextValue);
    setIsTagging(false);
    setShowTagSuggestions(false);

    // Focus back on textarea and place cursor after the inserted tag
    if (textAreaRef.current) {
      textAreaRef.current.focus();
      const newCursorPosition = tagStartIndex + company.name.length + 2; // +2 for @ and space
      textAreaRef.current.setSelectionRange(
        newCursorPosition,
        newCursorPosition,
      );
      setCursorPosition(newCursorPosition);
    }
  };

  // Handle user selection
  const handleSelectUser = (user: ProfileInterface) => {
    // Add user ID to tagged users if not already included
    if (!taggedUsers.includes(user.userId)) {
      setTaggedUsers([...taggedUsers, user.userId]);
    }

    // Calculate where the tag text begins and ends
    const beforeTag = newText.substring(0, tagStartIndex);
    const afterTag = newText.substring(cursorPosition);

    // Create the new text with the tagged user
    const displayName = `${user.firstname} ${user.lastname}`;

    const newTextValue = `${beforeTag}@${displayName} ${afterTag}`;

    // Add to tagged entities for rendering highlighted tags
    const newTaggedEntity: TaggedEntity = {
      id: user.userId,
      name: displayName,
      startIndex: tagStartIndex,
      endIndex: tagStartIndex + displayName.length + 1, // +1 for @ symbol
      type: "user",
    };

    setTaggedEntities([...taggedEntities, newTaggedEntity]);

    // Update text and reset tagging state
    setNewText(newTextValue);
    setIsTagging(false);
    setShowTagSuggestions(false);

    // Focus back on textarea and place cursor after the inserted tag
    if (textAreaRef.current) {
      textAreaRef.current.focus();
      const newCursorPosition = tagStartIndex + displayName.length + 2; // +2 for @ and space
      textAreaRef.current.setSelectionRange(
        newCursorPosition,
        newCursorPosition,
      );
      setCursorPosition(newCursorPosition);
    }
  };

  // Track tag integrity and remove if modified
  useEffect(() => {
    // Create a copy of entities and tagged items to modify
    const updatedEntities = [...taggedEntities];
    const updatedTaggedCompanies = [...taggedCompanies];
    const updatedTaggedUsers = [...taggedUsers];
    let hasChanges = false;

    // Check each tagged entity to see if it's still intact in the text
    for (let i = updatedEntities.length - 1; i >= 0; i--) {
      const entity = updatedEntities[i];

      // If the entity start position is beyond the text length or
      // if the text at the tagged position doesn't match the expected format
      if (
        entity.startIndex >= newText.length ||
        newText.substring(
          entity.startIndex,
          entity.startIndex + entity.name.length + 1,
        ) !== `@${entity.name}`
      ) {
        // Remove the entity and its ID from the tagged lists based on type
        if (entity.type === "company") {
          const companyIdIndex = updatedTaggedCompanies.indexOf(entity.id);
          if (companyIdIndex !== -1) {
            updatedTaggedCompanies.splice(companyIdIndex, 1);
          }
        } else if (entity.type === "user") {
          const userIdIndex = updatedTaggedUsers.indexOf(entity.id);
          if (userIdIndex !== -1) {
            updatedTaggedUsers.splice(userIdIndex, 1);
          }
        }

        updatedEntities.splice(i, 1);
        hasChanges = true;
      }
    }

    // Update state only if changes were made
    if (hasChanges) {
      setTaggedEntities(updatedEntities);
      setTaggedCompanies(updatedTaggedCompanies);
      setTaggedUsers(updatedTaggedUsers);
    }
  }, [newText]);

  // Convert taggedEntities to the format the API expects (TaggedObject[])
  const prepareTaggedCompanies = (): TaggedObject[] => {
    return taggedEntities
      .filter((entity) => entity.type === "company")
      .map((entity) => ({
        id: entity.id,
        index: entity.endIndex,
      }));
  };

  // Convert taggedEntities to the format the API expects (TaggedObject[])
  const prepareTaggedUsers = (): TaggedObject[] => {
    return taggedEntities
      .filter((entity) => entity.type === "user")
      .map((entity) => ({
        id: entity.id,
        index: entity.endIndex,
      }));
  };

  async function handleAddPost() {
    try {
      const uploadedMediaResponses = await Promise.all(
        newMedia.map(async (media) => {
          const formData = new FormData();
          formData.append("file", media.file);
          formData.append("type", media.type);

          setUploadingFiles((prev) => {
            const updated = new Set(prev);
            updated.add(media.file.name);
            return updated;
          });

          const response = await mediaUpload.mutateAsync(formData);

          setUploadingFiles((prev) => {
            const updated = new Set(prev);
            updated.delete(media.file.name);
            return updated;
          });

          return response;
        }),
      );

      // Transform tagged companies and users from string[] to TaggedObject[]
      const taggedCompaniesObjects = prepareTaggedCompanies();
      const taggedUsersObjects = prepareTaggedUsers();

      console.log("Tagged Companies:", taggedCompaniesObjects);
      console.log("Tagged Users:", taggedUsersObjects);

      toast.promise(
        addPost.mutateAsync({
          text: newText,
          media: uploadedMediaResponses,
          isPublic,
          taggedCompanies: taggedCompaniesObjects,
          taggedUsers: taggedUsersObjects,
        }),
        {
          loading: "Creating post...",
          success: "Post created successfully!",
          error: (error) => error.message,
        },
      );
    } catch (error) {
      console.error("Error posting", error);
    }
  }

  function handleFileUpload(
    event: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ) {
    const files = event.target.files;
    if (files) {
      const uploadedFiles: MediaUpload[] = [];
      Array.from(files).forEach((file) => {
        let mediaType: MediaTypes | null = null;

        switch (type) {
          case "image":
            mediaType = MediaTypes.Image;
            break;
          case "video":
            mediaType = MediaTypes.Video;
            break;
          case "audio":
            mediaType = MediaTypes.Audio;
            break;
          case "document":
            mediaType = MediaTypes.Document;
            break;
          default:
            mediaType = null;
        }

        if (mediaType) {
          uploadedFiles.push({ type: mediaType, file });
        } else {
          toast.error("Unsupported file type.");
        }
      });

      setNewMedia((prevMedia) => [...prevMedia, ...uploadedFiles]);
    }
  }

  function handleRemoveFile(index: number) {
    const updatedMedia = [...newMedia];
    const fileName = updatedMedia[index].file.name;

    setUploadingFiles((prev) => {
      const updated = new Set(prev);
      updated.delete(fileName);
      return updated;
    });

    updatedMedia.splice(index, 1);
    setNewMedia(updatedMedia);
  }

  const isPosting = addPost.isPending || mediaUpload.isPending;

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-[18px] text-warmBlack sm:text-[25px] mb-6">
        Create a new Post
      </h1>

      <div className="mb-4">
        <p className="font-bold text-[16px] text-warmBlack mb-2 flex items-center">
          <span className="mr-1">Who should see this?</span>
        </p>
        <Menu as="div" className="relative inline-block">
          {({ open }) => (
            <>
              <MenuButton className="flex items-center justify-between px-4 py-2 bg-gray-100 hover:bg-gray-200 text-warmBlack rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-crimsonRed focus:ring-opacity-50 shadow-sm">
                <span className="flex items-center">
                  {isPublic ? (
                    <Globe className="w-4 h-4 mr-2 text-blue-600" />
                  ) : (
                    <Users className="w-4 h-4 mr-2 text-green-600" />
                  )}
                  <span className="font-medium">
                    {isPublic ? "Everyone" : "Connections"}
                  </span>
                </span>
                <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
              </MenuButton>

              <AnimatePresence>
                {open && (
                  <MenuItems
                    static
                    modal={false}
                    className="absolute left-0 mt-1 w-48 origin-top-left bg-white border border-gray-200 rounded-lg shadow-lg focus:outline-none z-50 overflow-hidden"
                    as={motion.div}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <MenuItem>
                      <button
                        onClick={() => setIsPublic(true)}
                        className={`${
                          isPublic ? "bg-blue-50" : ""
                        } w-full flex items-center px-4 py-3 text-sm transition duration-200 ease-in-out border-b border-gray-100`}
                      >
                        <Globe className="w-5 h-5 mr-3 text-blue-600" />
                        <div className="flex flex-col items-start">
                          <span className="font-medium text-warmBlack">
                            Everyone
                          </span>
                          <span className="text-xs text-gray-500">
                            Visible to all users
                          </span>
                        </div>
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => setIsPublic(false)}
                        className={`${
                          !isPublic ? "bg-blue-50" : ""
                        } w-full flex items-center px-4 py-3 text-sm transition duration-200 ease-in-out`}
                      >
                        <Users className="w-5 h-5 mr-3 text-green-600" />
                        <div className="flex flex-col items-start">
                          <span className="font-medium text-warmBlack">
                            Connections
                          </span>
                          <span className="text-xs text-gray-500">
                            Only visible to your connections
                          </span>
                        </div>
                      </button>
                    </MenuItem>
                  </MenuItems>
                )}
              </AnimatePresence>
            </>
          )}
        </Menu>
      </div>

      <div className="relative">
        <textarea
          id="postText"
          ref={textAreaRef}
          value={newText}
          disabled={isPosting}
          placeholder="Speak your mind..."
          onChange={handleTextChange}
          onKeyUp={handleKeyUp}
          onSelect={(e) => setCursorPosition(e.currentTarget.selectionStart)}
          onClick={(e) => setCursorPosition(e.currentTarget.selectionStart)}
          className="bg-white outline-[0.7px] text-[14px] text-charcoalBlack h-50 px-2 py-3 rounded-md hover:cursor-text hover:outline-[1px] hover:bg-gray-100 focus:outline-[1.5px] w-full"
        />

        {/* Tagging info */}
        <div className="mt-1 text-xs text-gray-500">
          <span>
            Use <kbd className="px-1 py-0.5 bg-gray-100 border rounded">@</kbd>{" "}
            to tag companies or users
          </span>
        </div>

        {/* Tag suggestions dropdown - Combined for both users and companies */}
        {showTagSuggestions &&
          (companyOptions.length > 0 || userOptions.length > 0) && (
            <div
              ref={tagListRef}
              className="absolute left-0 bg-white shadow-lg rounded-md mt-1 max-h-60 overflow-y-auto z-10 w-64 border border-gray-200"
            >
              <div className="p-2 bg-gray-50 border-b border-gray-200">
                <p className="text-xs text-gray-500">
                  Suggestions matching "@{tagQuery}"
                </p>
              </div>
              <ul>
                {/* Companies Section */}
                {companyOptions.length > 0 && (
                  <li className="sticky top-0 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 border-b border-gray-200">
                    Companies
                  </li>
                )}
                {companyOptions.map((company) => (
                  <li key={`company-${company.id}`}>
                    <button
                      className="tag-suggestion w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-100 focus:outline-none transition-colors"
                      onClick={() => handleSelectCompany(company)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-warmBlack">
                          {company.name}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                          Company
                        </span>
                      </div>
                    </button>
                  </li>
                ))}

                {/* Users Section */}
                {userOptions.length > 0 && (
                  <li className="sticky top-0 bg-green-50 px-3 py-1 text-xs font-medium text-green-600 border-b border-gray-200">
                    Users
                  </li>
                )}
                {userOptions.map((user) => (
                  <li key={`user-${user.userId}`}>
                    <button
                      className="tag-suggestion w-full text-left px-4 py-2 hover:bg-green-50 focus:bg-green-100 focus:outline-none transition-colors"
                      onClick={() => handleSelectUser(user)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {user.profilePicture && (
                            <img
                              src={user.profilePicture}
                              alt={user.username || ""}
                              className="w-6 h-6 rounded-full mr-2"
                            />
                          )}
                          <span className="font-medium text-warmBlack">
                            {`${user.firstname} ${user.lastname}`}
                          </span>
                        </div>
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">
                          User
                        </span>
                      </div>
                    </button>
                  </li>
                ))}

                {/* No results message */}
                {companyOptions.length === 0 && userOptions.length === 0 && (
                  <li className="px-4 py-3 text-sm text-gray-500 italic">
                    No matching companies or users found
                  </li>
                )}
              </ul>
            </div>
          )}
      </div>

      <div className="flex flex-row pt-4">
        <label className="flex flex-col items-center mr-2 bg-blue-200 text-blue-600 p-1.5 rounded-full hover:bg-blue-300 transition cursor-pointer">
          <span className="material-icons">image</span>
          <input
            type="file"
            accept="image/*"
            className={`hidden ${isPosting ? "opacity-50" : ""}`}
            disabled={isPosting}
            onChange={(e) => handleFileUpload(e, "image")}
          />
        </label>
        <label className="flex flex-col items-center mr-2 bg-green-200 text-green-600 p-1.5 rounded-full hover:bg-green-300 transition cursor-pointer">
          <span className="material-icons">videocam</span>
          <input
            type="file"
            accept="video/*"
            className={`hidden ${isPosting ? "opacity-50" : ""}`}
            disabled={isPosting}
            onChange={(e) => handleFileUpload(e, "video")}
          />
        </label>
        <label className="flex flex-col items-center mr-2 bg-purple-200 text-purple-600 p-1.5 rounded-full hover:bg-purple-300 transition cursor-pointer">
          <span className="material-icons">audiotrack</span>
          <input
            type="file"
            accept="audio/*"
            className={`hidden ${isPosting ? "opacity-50" : ""}`}
            disabled={isPosting}
            onChange={(e) => handleFileUpload(e, "audio")}
          />
        </label>
        <label className="flex flex-col items-center bg-orange-200 text-orange-600 p-1.5 rounded-full hover:bg-orange-300 transition cursor-pointer">
          <span className="material-icons">description</span>
          <input
            type="file"
            accept=".txt,.pdf,.doc,.docx"
            className={`hidden ${isPosting ? "opacity-50" : ""}`}
            disabled={isPosting}
            onChange={(e) => handleFileUpload(e, "document")}
          />
        </label>
      </div>

      {newMedia.length > 0 && (
        <div className="mt-4 mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Attached files ({newMedia.length})
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {newMedia.map((media, index) => {
              const isUploading = uploadingFiles.has(media.file.name);
              return (
                <div
                  key={index}
                  className="relative group rounded-lg shadow-md overflow-hidden bg-white"
                >
                  <div className="relative h-32 w-full flex items-center justify-center bg-gray-100">
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                        <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                      </div>
                    )}

                    {media.type === MediaTypes.Image && (
                      <img
                        src={URL.createObjectURL(media.file)}
                        alt="Uploaded"
                        className={`h-full w-full object-cover ${isUploading ? "blur-sm" : ""}`}
                      />
                    )}

                    {media.type === MediaTypes.Video && (
                      <div className="h-full w-full relative">
                        <video
                          src={URL.createObjectURL(media.file)}
                          className={`h-full w-full object-cover ${isUploading ? "blur-sm" : ""}`}
                        />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="material-icons text-white text-4xl bg-black bg-opacity-30 rounded-full p-2">
                            play_arrow
                          </span>
                        </span>
                      </div>
                    )}

                    {media.type === MediaTypes.Audio && (
                      <div className="h-full w-full flex items-center justify-center bg-purple-50">
                        <span className="material-icons text-purple-600 text-5xl">
                          audiotrack
                        </span>
                      </div>
                    )}

                    {media.type === MediaTypes.Document && (
                      <div className="h-full w-full flex items-center justify-center bg-orange-50">
                        <span className="material-icons text-orange-600 text-5xl">
                          description
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="px-2 py-1 border-t">
                    <p className="text-xs text-gray-700 truncate font-medium">
                      {media.file.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {(media.file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemoveFile(index)}
                    disabled={isPosting}
                    className="absolute top-1 right-1 bg-white rounded-full shadow h-5 w-5 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity group-hover:opacity-100"
                  >
                    <span className="material-icons text-crimsonRed text-sm">
                      clear
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {taggedUsers.length > 0 && (
        <div className="mt-2 mb-3">
          <p className="text-xs text-gray-600 mb-1">Tagged users:</p>
          <div className="flex flex-wrap gap-2">
            {taggedEntities
              .filter((entity) => entity.type === "user")
              .map((entity, idx) => (
                <div
                  key={`tag-preview-${idx}`}
                  className="bg-red-50 border border-red-200 rounded-full px-3 py-1 flex items-center"
                >
                  <span className="text-crimsonRed text-xs font-medium">
                    @{entity.name}
                  </span>
                  <button
                    className="ml-1 text-red-400 hover:text-crimsonRed"
                    onClick={() => {
                      // Remove the tagged users
                      const updatedUsers = taggedUsers.filter(
                        (id) => id !== entity.id,
                      );
                      setTaggedUsers(updatedUsers);

                      // Remove the entity from the tagged entities
                      const updatedEntities = taggedEntities.filter(
                        (e) => e.id !== entity.id,
                      );
                      setTaggedEntities(updatedEntities);

                      // Remove the tag from text
                      const beforeTag = newText.substring(0, entity.startIndex);
                      const afterTag = newText.substring(
                        entity.startIndex + entity.name.length + 1,
                      );
                      setNewText(beforeTag + afterTag);
                    }}
                  >
                    <X />
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {taggedCompanies.length > 0 && (
        <div className="mt-2 mb-3">
          <p className="text-xs text-gray-600 mb-1">Tagged companies:</p>
          <div className="flex flex-wrap gap-2">
            {taggedEntities
              .filter((entity) => entity.type === "company")
              .map((entity, idx) => (
                <div
                  key={`tag-preview-${idx}`}
                  className="bg-red-50 border border-red-200 rounded-full px-3 py-1 flex items-center"
                >
                  <span className="text-crimsonRed text-xs font-medium">
                    @{entity.name}
                  </span>
                  <button
                    className="ml-1 text-red-400 hover:text-crimsonRed"
                    onClick={() => {
                      // Remove the tagged company
                      const updatedCompanies = taggedCompanies.filter(
                        (id) => id !== entity.id,
                      );
                      setTaggedCompanies(updatedCompanies);

                      // Remove the entity from the tagged entities
                      const updatedEntities = taggedEntities.filter(
                        (e) => e.id !== entity.id,
                      );
                      setTaggedEntities(updatedEntities);

                      // Remove the tag from text
                      const beforeTag = newText.substring(0, entity.startIndex);
                      const afterTag = newText.substring(
                        entity.startIndex + entity.name.length + 1,
                      );
                      setNewText(beforeTag + afterTag);
                    }}
                  >
                    <X />
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="flex flex-row w-full pt-2">
        <button
          onClick={handleAddPost}
          className={`bg-crimsonRed text-warmWhite px-6 py-2 rounded-3xl cursor-pointer hover:bg-red-700 transition duration-400 ease-in-out font-medium ${isPosting ? "opacity-50" : ""}`}
          disabled={isPosting}
        >
          {isPosting ? (
            <span className="flex items-center">
              <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
              Posting...
            </span>
          ) : (
            "Post"
          )}
        </button>
      </div>
    </div>
  );
}
