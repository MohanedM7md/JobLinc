import ConnectCard from "./ConnectCard";

function ConnectionsGrid() {
    const people = [
        {
            lincbuttonid: "LincButton1",
            profilePicture: "src/assets/Tyrone.jpg",
            userName: "Tyrone",
            userBio: "Junior plumbing student @ Waterloo University",
            mutuals: "Abdelrahman Fathy and 3 others are mutual connections"
        },
        {
            lincbuttonid: "LincButton2",
            profilePicture: "src/assets/Jane.jpg",
            userName: "Jane",
            userBio: "Senior graphic designer @ Creative Arts",
            mutuals: "Ahmed El-Sayed and 5 others are mutual connections"
        },
        {
            lincbuttonid: "LincButton3",
            profilePicture: "src/assets/John.jpg",
            userName: "John",
            userBio: "Software engineer @ Tech Solutions",
            mutuals: "Sara Ibrahim and 2 others are mutual connections"
        },
        {
            lincbuttonid: "LincButton1",
            profilePicture: "src/assets/Tyrone.jpg",
            userName: "Tyrone",
            userBio: "Junior plumbing student @ Waterloo University",
            mutuals: "Abdelrahman Fathy and 3 others are mutual connections"
        },
        {
            lincbuttonid: "LincButton1",
            profilePicture: "src/assets/Tyrone.jpg",
            userName: "Tyrone",
            userBio: "Junior plumbing student @ Waterloo University",
            mutuals: "Abdelrahman Fathy and 3 others are mutual connections"
        },  
        
    ];

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 bg-white rounded-md border-2 border-gray-200 p-4 ">
            {people.map((person, index) => (
                <ConnectCard
                    key={index}
                    lincbuttonid={person.lincbuttonid}
                    profilePicture={person.profilePicture}
                    userName={person.userName}
                    userBio={person.userBio}
                    Mutuals={person.mutuals}
                />
            ))}
        </div>
    );
}

export default ConnectionsGrid