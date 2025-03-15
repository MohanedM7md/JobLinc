interface MediaProps {
    pics: string[];
}


export default function PostMedia(props:MediaProps) {
    let renderedPics;
    renderPics();
    
    return (
        <div className="grid grid-rows-4 grid-cols-2">
            {renderedPics}
        </div>
    )

    function renderPics() {
        if (props.pics.length == 1) {
          return (renderedPics = props.pics.map((pic, index) => {
            return (
              <img
                key={index}
                src={pic}
                alt={`pic-${index}`}
                className={
                  props.pics.length == 4
                    ? "row-span-3 col-span-2"
                    : "row-span-4 col-span-2"
                }
              />
            );
          }));
        } else if (props.pics.length == 2) {
          return (renderedPics = props.pics.map((pic, index) => {
            return (
              <img
                key={index}
                src={pic}
                alt={`pic-${index}`}
                className="row-span-4"
              />
            );
          }));
        } else if (props.pics.length == 3) {
          return (renderedPics = props.pics.map((pic, index) => {
            if (index == 1) {
              return (
                <img
                  key={index}
                  src={pic}
                  alt={`pic-${index}`}
                  className="row-span-4"
                />
              );
            } else {
              return (
                <img
                  key={index}
                  src={pic}
                  alt={`pic-${index}`}
                  className="row-span-2"
                />
              );
            }
          }));
        } else if (props.pics.length == 4) {
          return (renderedPics = props.pics.map((pic, index) => {
            if (index == 1) {
              return (
                <img
                  key={index}
                  src={pic}
                  alt={`pic-${index}`}
                  className="row-span-3"
                />
              );
            } else {
              return <img key={index} src={pic} alt={`pic-${index}`} />;
            }
          }));
        } else if (props.pics.length == 5) {
          return (renderedPics = props.pics.map((pic, index) => {
            if (index == 1) {
              return (
                <img
                  key={index}
                  src={pic}
                  alt={`pic-${index}`}
                  className="row-span-4"
                />
              );
            } else {
              return <img key={index} src={pic} alt={`pic-${index}`} />;
            }
          }));
        } else {
          return (renderedPics = props.pics.map((pic, index) => {
            if (index == 1) {
              return (
                <img
                  key={index}
                  src={pic}
                  alt={`pic-${index}`}
                  className="row-span-4"
                />
              );
            }
            else if (index < 5) {
                return <img key={index} src={pic} alt={`pic-${index}`} />;
            }
            else if (index == 5) {
                return <img key={index} src={pic} alt={`pic-${index}`} />;
            }
            else {
                return null;
            }
          }));
        }
    }
}

