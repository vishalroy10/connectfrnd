import { useMediaQuery } from "@mui/material";

export const useScreenSize = () => {
    const isTablet = useMediaQuery('(max-width:1024px)');
    const isMobile = useMediaQuery('(max-width:600px)');

    return {
        isTablet,
        isMobile
    }
}

