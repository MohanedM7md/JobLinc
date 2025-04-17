interface Logoprops{
  id:string
}
function Logo(props:Logoprops) {
  const handleRefresh = (): void => {
    window.location.reload(); 
  };

  return (
    <img
      id={props.id}
      src="./src/assets/LogoDark1.png"
      className="w-17 h-10 m-1 mr-6 rounded hover:bg-gray-50 hover:shadow-md"
      onClick={handleRefresh}
      alt="Logo"
    />
  );
}

export default Logo;
