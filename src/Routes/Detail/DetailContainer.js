import React from "react";
import DetailPresenter from "./DetailPresenter";
import { movieApi, tvApi } from "../../api";

// eslint-disable-next-line
export default class extends React.Component {
    constructor(props) {
        super(props);
        const {
            location: { pathname },
        } = props;
        this.state = {
            result: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/"),
            activeTab: 0,
            tabHandler: this.tabHandler,
        };
    }

    tabHandler = (id) => {
        this.setState({ activeTab: id });
    };

    async componentDidMount() {
        const {
            match: {
                params: { id },
            },
            history: { push },
        } = this.props;
        const { isMovie } = this.state;
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return push("/");
        }
        let result = null;
        try {
            if (isMovie) {
                ({ data: result } = await movieApi.movieDetail(parsedId));
            } else {
                ({ data: result } = await tvApi.showDetail(parsedId));
            }
        } catch {
            this.setState({ error: "Can't find anything." });
        } finally {
            this.setState({ loading: false, result });
        }
    }
    render() {
        const { result, error, loading, activeTab, tabHandler, isMovie } = this.state;

        return (
            <DetailPresenter
                result={result}
                error={error}
                loading={loading}
                activeTab={activeTab}
                tabHandler={tabHandler}
                isMovie={isMovie}
            />
        );
    }
}
