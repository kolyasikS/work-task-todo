import {MutableRefObject, useEffect, useRef} from "react";

const useObserver = (ref: MutableRefObject<any>,
                     callback: (value?: boolean) => void,
                     isDone?: boolean,
                     options?: IntersectionObserverInit) => {
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (isDone) {
            return;
        }
        if (observer.current) {
            observer.current.disconnect();
        }
        const cb = ([entry]: any, observer: any) => {
            if (entry.isIntersecting) {
                callback(false);
            } else {
                if (entry.boundingClientRect.top > 0) {
                }
            }
        };

        observer.current = new IntersectionObserver(cb, options);
        observer.current.observe(ref.current);
    }, [isDone]);
};

export default useObserver;