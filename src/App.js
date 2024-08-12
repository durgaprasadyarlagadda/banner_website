// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//     const [bannerData, setBannerData] = useState({
//         description: '',
//         link: '',
//         timer: 0,
//         isVisible: false,
//     });

//     const [showBanner, setShowBanner] = useState(false);
//     const [remainingTime, setRemainingTime] = useState(0);

//     useEffect(() => {
//         axios.get('http://localhost:3001/api/banner')
//             .then(response => {
//                 setBannerData(response.data);
//                 if (response.data.isVisible) {
//                     setShowBanner(true);
//                     setRemainingTime(response.data.timer);
//                 }
//             })
//             .catch(error => console.error('Error fetching banner data:', error));
//     }, []);

//     useEffect(() => {
//         let timer;
//         if (showBanner && remainingTime > 0) {
//             timer = setInterval(() => {
//                 setRemainingTime(prevTime => {
//                     if (prevTime <= 1) {
//                         clearInterval(timer);
//                         setShowBanner(false);
//                         return 0;
//                     }
//                     return prevTime - 1;
//                 });
//             }, 1000);
//         } else if (!showBanner) {
//             setRemainingTime(0); // Reset time when banner is not shown
//         }

//         return () => clearInterval(timer); // Cleanup timer on component unmount or if dependencies change
//     }, [showBanner, remainingTime]);

//     const handleBannerUpdate = () => {
//         axios.post('http://localhost:3001/api/banner', bannerData)
//             .then(() => {
//                 if (bannerData.isVisible) {
//                     setShowBanner(true);
//                     setRemainingTime(bannerData.timer);
//                 } else {
//                     setShowBanner(false);
//                 }
//             })
//             .catch(error => console.error('Error updating banner:', error));
//     };

//     return (
//         <div className="App">
//             <div className="banner-form">
//                 <input
//                     type="text"
//                     placeholder="Description"
//                     value={bannerData.description}
//                     onChange={(e) => setBannerData({ ...bannerData, description: e.target.value })}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Link"
//                     value={bannerData.link}
//                     onChange={(e) => setBannerData({ ...bannerData, link: e.target.value })}
//                 />
//                 <input
//                     type="number"
//                     placeholder="Timer (seconds)"
//                     value={bannerData.timer}
//                     onChange={(e) => setBannerData({ ...bannerData, timer: parseInt(e.target.value) })}
//                 />
//                 <label>
//                     <input
//                         type="checkbox"
//                         checked={bannerData.isVisible}
//                         onChange={(e) => setBannerData({ ...bannerData, isVisible: e.target.checked })}
//                     />
//                     Visible
//                 </label>
//                 <button onClick={handleBannerUpdate}>Update Banner</button>
//             </div>

//             {showBanner && bannerData.isVisible && (
//                 <div className="banner">
//                     <p>{bannerData.description}</p>
//                     <a href={bannerData.link} target="_blank" rel="noopener noreferrer">
//                         Click Here
//                     </a>
//                     <p>Disappearing in: {remainingTime} seconds</p>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [bannerData, setBannerData] = useState({
        description: '',
        link: '',
        timer: 0,
        isVisible: false,
    });

    const [showBanner, setShowBanner] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3001/api/banner')
            .then(response => {
                setBannerData(response.data);
                if (response.data.isVisible) {
                    setShowBanner(true);
                    setRemainingTime(response.data.timer);
                }
            })
            .catch(error => console.error('Error fetching banner data:', error));
    }, []);

    useEffect(() => {
        let timer;
        if (showBanner && remainingTime > 0) {
            timer = setInterval(() => {
                setRemainingTime(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setShowBanner(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else if (!showBanner) {
            setRemainingTime(0); // Reset time when banner is not shown
        }

        return () => clearInterval(timer); // Cleanup timer on component unmount or if dependencies change
    }, [showBanner, remainingTime]);

    const handleBannerUpdate = () => {
        // Ensure the link includes the protocol
        const formattedLink = bannerData.link.startsWith('http://') || bannerData.link.startsWith('https://')
            ? bannerData.link
            : `http://${bannerData.link}`;

        axios.post('http://localhost:3001/api/banner', { ...bannerData, link: formattedLink })
            .then(() => {
                if (bannerData.isVisible) {
                    setShowBanner(true);
                    setRemainingTime(bannerData.timer);
                } else {
                    setShowBanner(false);
                }
            })
            .catch(error => console.error('Error updating banner:', error));
    };

    return (
        <div className="App">
            <div className="banner-form">
                <input
                    type="text"
                    placeholder="Description"
                    value={bannerData.description}
                    onChange={(e) => setBannerData({ ...bannerData, description: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Link"
                    value={bannerData.link}
                    onChange={(e) => setBannerData({ ...bannerData, link: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Timer (seconds)"
                    value={bannerData.timer}
                    onChange={(e) => setBannerData({ ...bannerData, timer: parseInt(e.target.value, 10) })}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={bannerData.isVisible}
                        onChange={(e) => setBannerData({ ...bannerData, isVisible: e.target.checked })}
                    />
                    Visible
                </label>
                <button onClick={handleBannerUpdate}>Update Banner</button>
            </div>

            {showBanner && bannerData.isVisible && (
                <div className="banner">
                    <p>{bannerData.description}</p>
                    <a href={`http://${bannerData.link}`} target="_blank" rel="noopener noreferrer">
                        Click Here
                    </a>
                    <p>Disappearing in: {remainingTime} seconds</p>
                </div>
            )}
        </div>
    );
}

export default App;
