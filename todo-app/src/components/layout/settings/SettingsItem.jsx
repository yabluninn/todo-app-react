// eslint-disable-next-line react/prop-types
import {useTranslation} from "react-i18next";

export default function SettingsItem({ title, content, buttonIcon, buttonText, buttonAction, buttonClass }) {
    const { t } = useTranslation();

    return (
        <div className="s-block-info">
            <p className="s-block-info-title">{t(title)}</p>
            <p className="s-block-info-content-p">
                {content}
                {buttonIcon && (
                    <button onClick={buttonAction} className={buttonClass}>
                        <i className={`hgi-stroke ${buttonIcon}`}></i>
                    </button>
                )}
                {buttonText && (
                    <button onClick={buttonAction} className={buttonClass}>
                        {t(buttonText)}
                    </button>
                )}
            </p>
        </div>
    );
}