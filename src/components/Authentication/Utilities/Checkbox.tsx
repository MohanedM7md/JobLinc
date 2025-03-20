interface CheckboxProps {
    labelText: string;
}

function Checkbox(props: CheckboxProps)
{
    return (
        <div className="flex items-center px-2">
            <input type="checkbox" id="default-checkbox" className="mr-2 scale-95" />
            <label htmlFor="default-checkbox" className="text-[14px] text-warmBlack">
                {props.labelText}
            </label>
        </div>
    );
}

export default Checkbox;