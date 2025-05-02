import { FollowInterface } from "@interfaces/networkInterfaces";

export const FollowerResponse: FollowInterface[] = [
    {
      companyId: "comp12345",
      companyName: "Tech Innovators Inc.",
      companyLogo: "https://example.com/logos/tech_innovators.png",
      userId: null,
      profilePicture: null,
      firstname: null,
      lastname: null,
      headline: "saye2",
      time: new Date("2025-04-27T14:23:00")
    },
    {
      companyId: "comp67890",
      companyName: "Green Earth Co.",
      companyLogo: "https://example.com/logos/green_earth.png",
      userId: null,
      profilePicture: null,
      firstname: null,
      lastname: null,
      headline: "Software Engineer at CloudSoft",
      time: new Date("2025-04-26T09:45:00")
    },
    {
      companyId: null,
      companyName: null,
      companyLogo: null,
      userId: "user12345",
      profilePicture: "https://example.com/profiles/user12345.png",
      firstname: "John",
      lastname: "Doe",
      headline: "Software Engineer at CloudSoft",
      time: new Date("2025-04-28T10:15:00")
    },
    {
      companyId: null,
      companyName: null,
      companyLogo: null,
      userId: "user67890",
      profilePicture: "https://example.com/profiles/user67890.png",
      firstname: "Jane",
      lastname: "Smith",
      headline: "Marketing Specialist at BrightMedia",
      time: new Date("2025-04-28T12:30:00")
    }
  ];