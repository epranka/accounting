import { css } from "styled-components";

const defaultBreakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
};

const createMinMedia = (breakpointSize, args) => {
    return css`
        @media (min-width: ${breakpointSize}px) {
            ${css(...args)}
        }
    `;
};

const createMaxMedia = (breakpointSize, args) => {
    return css`
        @media (max-width: ${breakpointSize - 1}px) {
            ${css(...args)}
        }
    `;
};

const minMedia = Object.keys(defaultBreakpoints).reduce(
    (result, breakpointLabel) => {
        result[breakpointLabel] = (...args) => {
            return createMinMedia(defaultBreakpoints[breakpointLabel], args);
        };

        return result;
    },
    {}
);

const maxMedia = Object.keys(defaultBreakpoints).reduce(
    (result, breakpointLabel) => {
        result[breakpointLabel] = (...args) => {
            return createMaxMedia(defaultBreakpoints[breakpointLabel], args);
        };

        return result;
    },
    {}
);

const min = function (breakpointSize) {
    return (...args) => {
        return createMinMedia(breakpointSize, args);
    };
};

const max = function (breakpointSize) {
    return (...args) => {
        return createMaxMedia(breakpointSize, args);
    };
};

Object.assign(min, minMedia);
Object.assign(max, maxMedia);

export const media = { min, max };
export const breakpoints = defaultBreakpoints;
