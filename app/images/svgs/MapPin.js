import React from 'react';
import Svg, {      
    Path,
    Rect, 
    Defs, 
    LinearGradient,
    RadialGradient,
    Polygon,
    Stop,
} from 'react-native-svg';

export default {
    MapPin: 
        <Svg
            width="50"
            height="50"
            viewBox="0 0 200 200"
            > 
            <Defs>                
                <LinearGradient id="linear-gradient" x1="100" y1="213.67" x2="100" y2="148.99" gradientUnits="userSpaceOnUse">
                    <Stop offset="0" stop-color="#4b4a4a"/>
                    <Stop offset="1" stop-color="#141212"/>
                </LinearGradient>
                <RadialGradient id="radial-gradient" cx="100.33" cy="-1" r="81.33" gradientUnits="userSpaceOnUse">
                    <Stop offset="0" stop-color="#4b4a4a"/>
                    <Stop offset="1" stop-color="#212020"/>
                </RadialGradient>
            </Defs>
            <Polygon 
                class="cls-1"
                fill="url(#linear-gradient)" 
                points="80.44 135.78 100 116.22 119.56 135.78 100 196 80.44 135.78"/>
            <Rect 
                class="cls-2"                 
                x="34" y="5" 
                width="132" 
                height="132" 
                rx="12.71" 
                ry="12.71"
                fill="#000"/>
            <Path fill="#fff" class="cls-3" d="M104.55,97.87c.45-.06.9-.15,1.35-.23l.7-.14c.45-.09.91-.21,1.36-.33l.62-.17c.48-.13,1-.28,1.42-.44l.44-.16A29.12,29.12,0,0,0,113.76,95l-8.33-8.5h0l-1.94-2-.26,0c-.49.08-1,.15-1.46.19l-.46,0c-.57,0-1.15,0-1.72,0l-.3,0a16.71,16.71,0,0,1-3.77-.64l-.07,0a17,17,0,0,1-1.85-.67l-.13-.07a15.77,15.77,0,0,1-1.64-.83l-.23-.13A18.11,18.11,0,0,1,90,81.38L90,81.32a17.32,17.32,0,0,1-1.59-1.4,16.84,16.84,0,0,1-3.71-18.21c0-.06,0-.12.08-.19.19-.45.39-.9.62-1.33l0-.06a16.89,16.89,0,0,1,3-4,17.26,17.26,0,0,1,1.58-1.39l.24-.17c.48-.36,1-.69,1.48-1l.26-.16a16.91,16.91,0,0,1,1.76-.87l.25-.1a15.33,15.33,0,0,1,1.57-.54l.38-.11a14.54,14.54,0,0,1,1.74-.37l.48-.07c.49-.06,1-.1,1.46-.12l.43,0c.56,0,1.13,0,1.68.06l.64.07c.46.06.92.13,1.38.23l.33.06,1.91-2h0l6.5-6.63h0l1.65-1.69.11-.11a29.62,29.62,0,0,0-3.67-1.58l0,0c-.57-.2-1.14-.39-1.72-.55l-.32-.1c-.54-.15-1.09-.29-1.64-.41l-.4-.08c-.55-.12-1.09-.22-1.65-.3l-.26,0a31,31,0,0,0-5-.28l-.89,0c-.38,0-.75,0-1.13.09s-.72.07-1.08.12-.68.09-1,.15-.81.14-1.22.22l-.89.19c-.49.12-1,.26-1.47.4l-.62.17A29.91,29.91,0,0,0,87,40.91l-.41.21c-.54.28-1.08.57-1.61.88l-.47.29c-.25.15-.52.3-.77.47l-4.51-4.51c-6-6-15.21,3.28-9.25,9.24l4.63,4.63a30.12,30.12,0,0,0-2.22,4.39l-.15.36c-.31.8-.6,1.6-.84,2.42l-.06.19A30.44,30.44,0,0,0,70.25,65l0,.28a29.93,29.93,0,0,0,0,5.6c0,.05,0,.1,0,.14.09.9.22,1.79.39,2.68l0,.17a30.25,30.25,0,0,0,1.59,5.39l.12.29c.35.85.74,1.7,1.17,2.52h0c.39.73.8,1.46,1.26,2.17L69.92,89.1c-6,6,3.28,15.21,9.24,9.25,2.19-2.19,2.69-2.7,4.88-4.88l.45.26.5.3c.48.28,1,.55,1.46.8l.57.29c.5.25,1,.47,1.51.69l.53.22c.66.27,1.33.51,2,.73h.05c.68.22,1.38.41,2.08.58l.71.15c.46.1.92.19,1.38.26l.9.14c.4,0,.8.1,1.2.13l1,.09,1.12,0,1.05,0,1,0c.79,0,1.58-.1,2.36-.19Zm-32.91-52a3.59,3.59,0,0,1-.92-4.15,4.76,4.76,0,0,1,4.13-3,3.73,3.73,0,0,1,2.68,1.23l4.26,4.25a30.34,30.34,0,0,0-2.86,2.49,29.31,29.31,0,0,0-3,3.49Zm5.84,50.85A3.71,3.71,0,0,1,74.8,97.9a4.75,4.75,0,0,1-4.13-3,3.57,3.57,0,0,1,.92-4.14l4.61-4.61a31.42,31.42,0,0,0,2.73,3.18,30.83,30.83,0,0,0,3.15,2.72Z"/>
            <Path fill="#fff" class="cls-3" d="M125.51,84.55a30.23,30.23,0,0,0,.2-32.75c2-2,2.31-2.34,4.32-4.35,6-6-3.28-15.21-9.24-9.25-1.52,1.51-1.32,1.35-2.83,2.86L108,51.25h0l-1.21,1.23a16.85,16.85,0,0,1-.46,31.25l1.79,1.82h0l8,8.15.06,0,4.66,4.66c6,6,15.21-3.28,9.25-9.24Zm3.78,10.36a4.76,4.76,0,0,1-4.13,3h0a3.76,3.76,0,0,1-2.68-1.22l-5.33-5.33-6.43-7.22a19.61,19.61,0,0,0,3.12-2.51,19,19,0,0,0,4-5.92,19.35,19.35,0,0,0,.18-14.92,19,19,0,0,0-7-8.66l6.09-6.82,5.36-5.4a3.75,3.75,0,0,1,2.68-1.23,4.77,4.77,0,0,1,4.14,3,3.58,3.58,0,0,1-.93,4.15l-5.67,5.7,1,1.61a27.79,27.79,0,0,1-.19,30.16l-1.06,1.62,5.91,5.91A3.57,3.57,0,0,1,129.29,94.91Z"/>
            <Path fill="#fff" class="cls-3" d="M133.86,117.39H66.15A15.26,15.26,0,0,1,50.9,102.15V34.44A15.26,15.26,0,0,1,66.15,19.2h67.71A15.26,15.26,0,0,1,149.1,34.44v67.71A15.26,15.26,0,0,1,133.86,117.39ZM66.15,21.68A12.77,12.77,0,0,0,53.39,34.44v67.71a12.78,12.78,0,0,0,12.76,12.76h67.71a12.77,12.77,0,0,0,12.75-12.76V34.44a12.77,12.77,0,0,0-12.75-12.76Z"/>
        </Svg>    
}