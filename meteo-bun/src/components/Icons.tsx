import { Line, Path, Polyline, Svg } from "react-native-svg";

const DEFAULT_SIZE = 30;
const DEFAULT_COLOR = "#fff";

type IconProps = {
    size?: number;
    color?: string;
}

export const IconHumidity = (props: IconProps) => {
    const color = props.color || DEFAULT_COLOR;
    const size = props.size || DEFAULT_SIZE;
    return (
        <Svg width={size} height={size}>
            <Path fill={color} d="m7.56 17.19c0-.88.24-1.89.72-3.03s1.1-2.25 1.86-3.31c1.56-2.06 2.92-3.62 4.06-4.67l.75-.72c.25.26.53.5.83.72.41.42 1.04 1.11 1.88 2.09s1.57 1.85 2.17 2.65c.71 1.01 1.32 2.1 1.81 3.25s.74 2.16.74 3.03c0 1-.19 1.95-.58 2.86s-.91 1.7-1.57 2.36-1.45 1.19-2.37 1.58-1.89.59-2.91.59c-1 0-1.95-.19-2.86-.57s-1.7-.89-2.36-1.55c-.66-.65-1.19-1.44-1.58-2.35s-.59-1.89-.59-2.93zm2.26-2.93c0 .83.17 1.49.52 1.99.35.49.88.74 1.59.74.72 0 1.25-.25 1.61-.74.35-.49.53-1.15.54-1.99-.01-.84-.19-1.5-.54-2-.35-.49-.89-.74-1.61-.74-.71 0-1.24.25-1.59.74-.35.5-.52 1.16-.52 2zm1.57 0c0-.15 0-.27 0-.35s.01-.19.02-.33.02-.25.05-.32.05-.16.09-.24.09-.15.15-.18c.07-.04.14-.06.23-.06.14 0 .25.04.33.12s.14.21.17.38c.03.18.05.32.06.45s.01.3.01.52c0 .23 0 .4-.01.52s-.03.27-.06.45c-.03.17-.09.3-.17.38s-.19.12-.33.12c-.09 0-.16-.02-.23-.06s-.12-.1-.15-.18c-.04-.08-.07-.17-.09-.24-.02-.08-.04-.19-.05-.32-.01-.14-.02-.25-.02-.32s0-.19 0-.34zm.59 7.75h1.32l4.99-10.74h-1.35zm4.3-2.99c.01.84.2 1.5.55 2 .35.49.89.74 1.6.74.72 0 1.25-.25 1.6-.74s.52-1.16.53-2c-.01-.84-.18-1.5-.53-1.99s-.88-.74-1.6-.74c-.71 0-1.25.25-1.6.74-.36.49-.54 1.15-.55 1.99zm1.57 0c0-.23 0-.4.01-.52s.03-.27.06-.45.09-.3.17-.38.19-.12.33-.12c.09 0 .17.02.24.06s.12.1.16.19.07.17.1.24.04.18.05.32l.01.32v.34.35l-.01.32-.05.32-.1.24-.16.19-.24.06c-.14 0-.25-.04-.33-.12s-.14-.21-.17-.38c-.03-.18-.05-.33-.06-.45s-.01-.3-.01-.53z"/>
        </Svg>
    );
}

export const IconCloudiness = (props: IconProps) => {
    const color = props.color || DEFAULT_COLOR;
    const size = props.size || DEFAULT_SIZE;
    return (
        <Svg width={size} height={size}>
            <Path fill={color} d="m4.61 16.88c0-1.15.36-2.17 1.08-3.07s1.63-1.48 2.74-1.73c.31-1.37 1.02-2.49 2.11-3.37s2.35-1.32 3.76-1.32c1.38 0 2.61.43 3.69 1.28s1.78 1.95 2.1 3.29h.33c.9 0 1.73.22 2.49.65s1.37 1.03 1.81 1.79.67 1.58.67 2.48c0 .88-.21 1.7-.63 2.45s-1 1.35-1.73 1.8-1.54.69-2.41.72h-11.21c-1.34-.06-2.47-.57-3.4-1.53-.93-.95-1.4-2.1-1.4-3.44zm1.71 0c0 .87.3 1.62.9 2.26s1.33.98 2.19 1.03h11.19c.86-.04 1.59-.39 2.19-1.03.61-.64.91-1.4.91-2.26 0-.88-.33-1.63-.98-2.27s-1.42-.96-2.32-.96h-1.6c-.11 0-.17-.06-.17-.18l-.07-.57c-.11-1.08-.58-1.99-1.4-2.72s-1.77-1.1-2.86-1.1-2.05.37-2.85 1.1c-.81.73-1.27 1.64-1.37 2.72l-.08.57c0 .12-.07.18-.2.18h-.53c-.84.1-1.54.46-2.1 1.07s-.85 1.33-.85 2.16z"/>
        </Svg>
    );
}

export const IconWind = (props: IconProps) => {
    const color = props.color || DEFAULT_COLOR;
    const size = props.size || DEFAULT_SIZE;
    return (
        <Svg width={size} height={size}>
            <Path fill={color} d="m3.1 16.97c0 .24.09.45.28.62.16.19.37.28.63.28h14.69c.29 0 .53.1.73.3s.3.45.3.74-.1.53-.3.72-.44.29-.74.29c-.29 0-.54-.1-.73-.29-.16-.18-.36-.26-.6-.26-.25 0-.46.09-.64.26s-.27.38-.27.61c0 .25.09.46.28.63.56.55 1.22.83 1.96.83.78 0 1.45-.27 2.01-.81s.83-1.19.83-1.97-.28-1.44-.84-2-1.23-.84-2-.84h-14.68c-.25 0-.46.09-.64.26s-.27.38-.27.63zm0-3.28c0 .23.09.43.28.61.17.18.38.26.63.26h20.04c.78 0 1.45-.27 2.01-.82.56-.54.84-1.2.84-1.97s-.28-1.44-.84-1.99-1.23-.83-2.01-.83c-.77 0-1.42.27-1.95.8-.18.16-.27.38-.27.67 0 .26.09.47.26.63s.38.24.63.24c.24 0 .45-.08.63-.24.19-.21.42-.31.7-.31.29 0 .53.1.73.3s.3.44.3.73-.1.53-.3.72-.44.29-.73.29h-20.04c-.25 0-.46.09-.64.26-.18.19-.27.4-.27.65z"/>
        </Svg>
    );  
}

export const IconUpRightArrow = (props: IconProps) => {
    const color = props.color || DEFAULT_COLOR;
    const size = props.size || DEFAULT_SIZE;
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" >
            <Line strokeWidth={2} stroke={color} stroke-linecap="round" stroke-linejoin="round" x1="7" y1="17" x2="17" y2="7"></Line><Polyline fill={color} points="7 7 17 7 17 17"></Polyline>
        </Svg>
    );
}

export const IconDownRightArrow = (props: IconProps) => {
    const color = props.color || DEFAULT_COLOR;
    const size = props.size || DEFAULT_SIZE;
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2} stroke={color} stroke-linecap="round" stroke-linejoin="round" >
            <Line strokeWidth={2} stroke={color} stroke-linecap="round" stroke-linejoin="round" x1="7" y1="7" x2="17" y2="17"></Line><Polyline points="17 7 17 17 7 17"></Polyline>
        </Svg>
    );
}
