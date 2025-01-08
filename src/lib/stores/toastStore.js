import { writable } from 'svelte/store';

const DEFAULT_SETTINGS = {
    position: 'top-right',
    duration: 3000
};

const createToastStore = () => {
    const { subscribe, set, update } = writable({
        toasts: [],
        settings: DEFAULT_SETTINGS
    });
    
    return {
        subscribe,
        addToast: (message, options = {}) => {
            const id = Date.now();
            const {
                type = 'default',
                duration = DEFAULT_SETTINGS.duration,
                color,
                simple = false,
                transition = true,
                dismisable = true,
                className = 'mb-2',
                position,
                divClass,
                defaultClass,
                closeClass,
                icon,
                iconClass,
            } = options;

            update(state => ({
                ...state,
                toasts: [...state.toasts, {
                    id,
                    message,
                    type,
                    duration,
                    color,
                    simple,
                    transition,
                    dismisable,
                    className,
                    position,
                    divClass,
                    defaultClass,
                    closeClass,
                    icon,
                    iconClass,
                }]
            }));
            
            setTimeout(() => {
                update(state => ({
                    ...state,
                    toasts: state.toasts.filter(t => t.id !== id)
                }));
            }, duration);
        },
        removeToast: (id) => {
            update(state => ({
                ...state,
                toasts: state.toasts.filter(t => t.id !== id)
            }));
        },
        clearToasts: () => update(state => ({ ...state, toasts: [] })),
        updateSettings: (newSettings) => {
            update(state => ({
                ...state,
                settings: { ...state.settings, ...newSettings }
            }));
        }
    };
};

export const toastStore = createToastStore();