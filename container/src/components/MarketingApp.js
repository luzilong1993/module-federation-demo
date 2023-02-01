import React, { useState, useEffect, useRef } from 'react';
import { mount } from 'marketing/MarketingApp';
import { useHistory } from 'react-router-dom';

export default function MarketingApp() {
    const ref = useRef();
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname,
            // 微应用路由变化时，通知到容器应用
            onNavigate({ pathname: nextPathname }) {
                const { pathname } = history.location;
                if (pathname !== nextPathname) {
                    history.push(nextPathname)
                }
            }
        });

        if (onParentNavigate) {
            history.listen(onParentNavigate)
        }
    }, [])
    return <div ref={ref}></div>
}