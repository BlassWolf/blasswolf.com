import {
    Component,
    ComponentType,
    h,
    createContext,
    ComponentChildren,
} from "preact";
import { useContext } from "preact/hooks";
export const RouterContext = createContext({
    path: "/",
    goTo: (path: string) => {},
});

export class Router extends Component<
    {
        routes: { [key: string]: ComponentType<{}> };
        notFound: ComponentType<{}>;
        path?: string;
    },
    { path: string }
> {
    state = {
        path:
            this.props?.path ||
            (typeof document !== "undefined"
                ? document.location.pathname
                : "/"),
    };

    componentDidMount() {
        if (typeof window === "undefined") return;
        window.onpopstate = () => {
            this.setState({ path: document.location.pathname });
        };
    }
    componentWillUnmount() {
        if (typeof window === "undefined") return;
        delete window.onpopstate;
    }
    getCurrentRoute(): [
        ComponentType<{}>,
        { [key: string]: string } | undefined
    ] {
        if (this.props.routes[this.state.path])
            return [this.props.routes[this.state.path], undefined];
        const path = this.state.path.split("/").filter(Boolean);
        for (let route in this.props.routes) {
            const routePath = route.split("/").filter(Boolean);
            if (routePath.length != path.length || !route.includes(":"))
                continue;
            let params: { [key: string]: string } | undefined = {};

            for (let i = 0; i < routePath.length; i++) {
                if (routePath[i] !== path[i] && !routePath[i].startsWith(":")) {
                    params = undefined;
                    break;
                }
                const param = routePath[i].substr(1);
                params[param] = path[i];
            }
            if (params) {
                return [this.props.routes[route], params];
            }
        }

        return [this.props.notFound, undefined];
    }
    goTo = (path: string) => {
        if (typeof window !== "undefined") {
            window.history.pushState({}, "", path);
        }
        this.setState({ path });
    };
    render() {
        const [Route, params] = this.getCurrentRoute();

        return (
            <RouterContext.Provider
                value={{
                    path: this.state.path,
                    goTo: this.goTo,
                }}
            >
                {/*@ts-ignore*/}
                <Route params={params} />
            </RouterContext.Provider>
        );
    }
}

export default function Link({
    to,
    ...props
}: {
    to: string;
    children?: ComponentChildren;
}) {
    const ctx = useContext(RouterContext);
    return (
        <a
            {...props}
            href={to}
            onClick={(e: MouseEvent) => {
                e.preventDefault();
                ctx.goTo(to);
            }}
        />
    );
}
