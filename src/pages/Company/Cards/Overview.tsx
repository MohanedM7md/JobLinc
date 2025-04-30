import { Company } from "@store/comapny/interfaces";

type OverviewProps = {
    company? : Company;
}

function Overview(props: OverviewProps)
{
    return (
        <div className="flex flex-col bg-white rounded-xl justify-start w-full p-5">
            <h2 className="font-bold text-[32px]">Overview</h2>
            {props.company && 
            <>
                <p>{props.company.overview}</p>
                {props.company.website && <div>
                    <strong>Website</strong>
                    <p>{props.company.website}</p>
                </div>}
                {props.company.industry && <div>
                    <strong>Industry</strong>
                    <p>{props.company.industry}</p>
                </div>}
                <div>
                    <strong>Company size</strong>
                    <p>{props.company.employees}</p>
                </div>
                {/* {props.company.locations[0] && <div>
                    <strong>Headquarters</strong>
                    {props.company.locations.map((location) => (
                        <p>{location.address}</p>
                    ))}
                </div>} */}
                <div>
                    <strong>Founded</strong>
                    <p>{props.company.createdAt}</p>
                </div>
            </>}
            
        </div>

    );
}

export default Overview;