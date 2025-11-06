import React,{ useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PageWrapper({ children }) {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [pendingChildren, setPendingChildren] = useState(null);

    useEffect(() => {
        if (location !== displayLocation) {

            setPendingChildren(children);
        }
    }, [location, children, displayLocation]);

    const handleReady = () => {

        setDisplayLocation(location);
        setPendingChildren(null);
    };


    const renderedChildren = pendingChildren
        ? React.cloneElement(pendingChildren, { onDataReady: handleReady })
        : children;

    return renderedChildren;
}
