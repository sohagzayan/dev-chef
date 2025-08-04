'use client';

import { useEffect, useState } from 'react';
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from 'react-icons/ai';
import { ISettings } from './Playground';

type PreferenceNavProps = {
    settings: ISettings;
    setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
    language: string;
    onLanguageChange: (language: string) => void;
};

const PreferenceNav: React.FC<PreferenceNavProps> = ({
    setSettings,
    settings,
    language,
    onLanguageChange,
}) => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleFullScreen = () => {
        if (isFullScreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
        setIsFullScreen(!isFullScreen);
    };

    useEffect(() => {
        function exitHandler() {
            if (!document.fullscreenElement) {
                setIsFullScreen(false);
                return;
            }
            setIsFullScreen(true);
        }

        if (document.addEventListener) {
            document.addEventListener('fullscreenchange', exitHandler);
            document.addEventListener('webkitfullscreenchange', exitHandler);
            document.addEventListener('mozfullscreenchange', exitHandler);
            document.addEventListener('MSFullscreenChange', exitHandler);
        }
    }, [isFullScreen]);

    return (
        <div
            className="bg-dark-layer-2 flex h-11 w-full items-center justify-between"
            style={{ backgroundColor: '#2d2d30' }}
        >
            <div className="flex items-center text-white">
                <select
                    value={language}
                    onChange={(e) => onLanguageChange(e.target.value)}
                    className="bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2 flex cursor-pointer items-center rounded border-none px-2 py-1.5 font-medium focus:outline-none"
                >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                </select>
            </div>

            <div className="m-2 flex items-center">
                <button
                    className="preferenceBtn group"
                    onClick={() => setSettings({ ...settings, settingsModalIsOpen: true })}
                >
                    <div className="text-dark-gray-6 h-4 w-4 text-lg font-bold">
                        <AiOutlineSetting />
                    </div>
                    <div className="preferenceBtn-tooltip">Settings</div>
                </button>

                <button className="preferenceBtn group" onClick={handleFullScreen}>
                    <div className="text-dark-gray-6 h-4 w-4 text-lg font-bold">
                        {!isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit />}
                    </div>
                    <div className="preferenceBtn-tooltip">Full Screen</div>
                </button>
            </div>
        </div>
    );
};

export default PreferenceNav;
