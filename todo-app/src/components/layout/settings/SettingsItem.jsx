// eslint-disable-next-line react/prop-types
export default function SettingsItem({ title, content, buttonIcon, buttonText, buttonAction, buttonClass }) {
    return (
        <div className="s-block-info">
            <p className="s-block-info-title">{title}</p>
            <p className="s-block-info-content-p">
                {content}
                {buttonIcon && (
                    <button onClick={buttonAction} className={buttonClass}>
                        <i className={`hgi-stroke ${buttonIcon}`}></i>
                    </button>
                )}
                {buttonText && (
                    <button onClick={buttonAction} className={buttonClass}>
                        {buttonText}
                    </button>
                )}
            </p>
        </div>
    );
}