import {useTranslation} from "react-i18next";

// eslint-disable-next-line react/prop-types
export default function SettingsBlock({ title, icon, children }) {
    const { t } = useTranslation();

    return (
        <div className="s-block">
            <p className="s-block-title">
                <i className={`hgi-stroke ${icon}`}></i>
                {t(title)}
            </p>
            {children}
        </div>
    );
}