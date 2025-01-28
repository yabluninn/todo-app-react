// eslint-disable-next-line react/prop-types
export default function SettingsBlock({ title, icon, children }) {
    return (
        <div className="s-block">
            <p className="s-block-title">
                <i className={`hgi-stroke ${icon}`}></i>
                {title}
            </p>
            {children}
        </div>
    );
}