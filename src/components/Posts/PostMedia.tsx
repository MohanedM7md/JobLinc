import { Media } from "@interfaces/postInterfaces";

interface MediaProps {
    media: Media[];
}


export default function PostMedia(props:MediaProps) {
    let renderedmedia;
    rendermedia();
    
    return (
        <div data-testid="media-rendering" className="grid grid-rows-4 grid-cols-2">
            {renderedmedia}
        </div>
    )

    function rendermedia() {
        if (props.media.length == 1) {
          return (renderedmedia = props.media.map((pic, index) => {
            return (
              <img
                key={index}
                src={pic.url}
                alt={`pic-${index}`}
                className={
                  props.media.length == 4
                    ? "row-span-3 col-span-2"
                    : "row-span-4 col-span-2"
                }
              />
            );
          }));
        } else if (props.media.length == 2) {
          return (renderedmedia = props.media.map((pic, index) => {
            return (
              <img
                key={index}
                src={pic.url}
                alt={`pic-${index}`}
                className="row-span-4"
              />
            );
          }));
        } else if (props.media.length == 3) {
          return (renderedmedia = props.media.map((pic, index) => {
            if (index == 1) {
              return (
                <img
                  key={index}
                  src={pic.url}
                  alt={`pic-${index}`}
                  className="row-span-4"
                />
              );
            } else {
              return (
                <img
                  key={index}
                  src={pic.url}
                  alt={`pic-${index}`}
                  className="row-span-2"
                />
              );
            }
          }));
        } else if (props.media.length == 4) {
          return (renderedmedia = props.media.map((pic, index) => {
            if (index == 1) {
              return (
                <img
                  key={index}
                  src={pic.url}
                  alt={`pic-${index}`}
                  className="row-span-3"
                />
              );
            } else {
              return <img key={index} src={pic.url} alt={`pic-${index}`} />;
            }
          }));
        } else if (props.media.length == 5) {
          return (renderedmedia = props.media.map((pic, index) => {
            if (index == 1) {
              return (
                <img
                  key={index}
                  src={pic.url}
                  alt={`pic-${index}`}
                  className="row-span-4"
                />
              );
            } else {
              return <img key={index} src={pic.url} alt={`pic-${index}`} />;
            }
          }));
        } else {
          return (renderedmedia = props.media.map((pic, index) => {
            if (index == 1) {
              return (
                <img
                  key={index}
                  src={pic.url}
                  alt={`pic-${index}`}
                  className="row-span-4"
                />
              );
            }
            else if (index < 5) {
                return <img key={index} src={pic.url} alt={`pic-${index}`} />;
            }
            else if (index == 5) {
                return <img key={index} src={pic.url } alt={`pic-${index}`} />;
            }
            else {
                return null;
            }
          }));
        }
    }
}

