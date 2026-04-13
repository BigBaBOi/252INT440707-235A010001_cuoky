/**
 * Precision Lab | Tailwind Configuration
 * Centered configuration for global UI consistency.
 */

tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#0041c8",
                "on-primary": "#ffffff",
                "primary-container": "#0055ff",
                "on-primary-container": "#e3e6ff",
                "primary-fixed": "#dce1ff",
                "primary-fixed-dim": "#b6c4ff",
                "on-primary-fixed": "#001551",
                "on-primary-fixed-variant": "#0039b3",

                "secondary": "#515f74",
                "on-secondary": "#ffffff",
                "secondary-container": "#d5e3fc",
                "on-secondary-container": "#57657a",
                "secondary-fixed": "#d5e3fc",
                "secondary-fixed-dim": "#b9c7df",
                "on-secondary-fixed": "#0d1c2e",
                "on-secondary-fixed-variant": "#3a485b",

                "tertiary": "#6410d5",
                "on-tertiary": "#ffffff",
                "tertiary-container": "#7d3bee",
                "on-tertiary-container": "#eee2ff",
                "tertiary-fixed": "#eaddff",
                "on-tertiary-fixed": "#25005a",
                "on-tertiary-fixed-variant": "#5a00c6",

                "error": "#ba1a1a",
                "on-error": "#ffffff",
                "error-container": "#ffdad6",
                "on-error-container": "#93000a",

                "surface": "#faf8ff",
                "on-surface": "#191b25",
                "surface-variant": "#e1e1ef",
                "on-surface-variant": "#434656",
                "surface-bright": "#faf8ff",
                "surface-dim": "#d9d9e6",
                "surface-tint": "#004dea",
                "surface-container-lowest": "#ffffff",
                "surface-container-low": "#f3f2ff",
                "surface-container": "#ededfb",
                "surface-container-high": "#e7e7f5",
                "surface-container-highest": "#e1e1ef",

                "outline": "#737688",
                "outline-variant": "#c3c5d9",
                "inverse-surface": "#2e303a",
                "inverse-on-surface": "#f0f0fd",
                "inverse-primary": "#b6c4ff",
                "background": "#faf8ff",
                "on-background": "#191b25"
            },
            borderRadius: {
                "DEFAULT": "0.125rem",
                "lg": "0.25rem",
                "xl": "0.5rem",
                "full": "0.75rem"
            },
            fontFamily: {
                headline: ["Space Grotesk"],
                body: ["Inter"],
                label: ["Inter"]
            }
        }
    }
}
