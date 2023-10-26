import {MutableRefObject, useEffect, useRef} from "react";

const useObserver = (ref: MutableRefObject<any>,
                     callback: (value?: boolean) => void,
                     isDone?: boolean,
                     options?: IntersectionObserverInit) => {
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {

        if (observer.current) {
            observer.current.disconnect();
        }
        const cb = ([entry]: any, observer: any) => {
            if (entry.isIntersecting) {
                if (isDone) {
                    return;
                }
                callback(false);
            }
        };
        observer.current = new IntersectionObserver(cb, options);
        observer.current.observe(ref.current);
    }, [isDone]);
};

export default useObserver;