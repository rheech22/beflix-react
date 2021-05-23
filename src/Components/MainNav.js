import React, { Component } from "react";
import styled from "styled-components";
import noPoster from "../assets/noPosterSmall.png";

const Nav = styled.div`
    display: flex;
    justify-content: center;
`;

const List = styled.ul`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 17px 17px 0 17px;
    font-size: 20px;
    color: white;
`;

const Tab = styled.li`
    text-align: center;
    height: 35px;
    width: 100%;
    cursor: pointer;
    border-bottom: ${(props) => (props.active ? "3px solid white" : "none")};
`;

const Videos = styled.div`
    display: grid;
    width: 100%;
    height: 70%;
    padding: 15px;
    gap: 10px;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;
`;

const Video = styled.iframe`
    justify-self: center;
    width: 100%;
    height: 100%;
    border-radius: 10px;
`;

const Productions = styled.div`
    display: grid;
    width: 100%;
    height: 70%;
    padding: 15px;
    gap: 10px;
    grid-template-columns: 25% 25% 25% 25%;
`;

const Box = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
`;

const Logo = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.bgUrl});
    background-position-x: center;
    background-size: contain;
    background-repeat: no-repeat;
    width: 100%;
    height: 0;
    padding-top: 66.64%;
    margin-bottom: 30px;
    margin-top: 30px;
`;

const Name = styled.span`
    width: 100%;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 20px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const Countries = styled.ul`
    display: flex;
    width: 100%;
    height: 70%;
    padding: 15px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Country = styled.li`
    font-size: 20px;
    text-align: center;
    padding: 10px;
`;

const Seasons = styled.div`
    display: grid;
    width: 100%;
    height: 70%;
    padding: 15px;
    gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(23%, auto));
`;

export default class MainNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: this.props.activeTab,
            tabHandler: this.props.tabHandler,
            isMovie: this.props.isMovie,
            result: this.props.result,
        };
    }

    render() {
        const {
            result: {
                videos: { results: videoList },
                production_companies: productions,
                production_countries: countries,
                seasons,
                belongs_to_collection: collection,
            },
        } = this.props;
        const tabs = ["Related Videos", "Productions", "Countries", "Series"];
        const tab = {
            0: (
                <Videos>
                    {videoList
                        .map((video, id) => {
                            return (
                                <Video
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                    key={id}
                                ></Video>
                            );
                        })
                        .slice(0, 4)}
                </Videos>
            ),
            1: (
                <Productions>
                    {productions
                        .map((company, id) => {
                            return (
                                <Box key={id}>
                                    <Logo
                                        bgUrl={
                                            company.logo_path
                                                ? `https://image.tmdb.org/t/p/original${company.logo_path}`
                                                : noPoster
                                        }
                                    />
                                    <Name>{company.name}</Name>
                                </Box>
                            );
                        })
                        .slice(0, 4)}
                </Productions>
            ),
            2: (
                <Countries>
                    {countries.map((country, id) => {
                        return <Country key={id}>{country.name}</Country>;
                    })}
                </Countries>
            ),
            3:
                this.props.isMovie === false ? (
                    <Seasons>
                        {seasons.map((season, id) => {
                            return (
                                <Box key={id}>
                                    <Logo
                                        bgUrl={
                                            season.poster_path
                                                ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                                                : noPoster
                                        }
                                    />
                                    <Name>{season.name}</Name>
                                </Box>
                            );
                        })}
                    </Seasons>
                ) : (
                    <Seasons>
                        {collection !== null ? (
                            <Box>
                                <Logo
                                    bgUrl={
                                        collection.poster_path
                                            ? `https://image.tmdb.org/t/p/original${collection.poster_path}`
                                            : noPoster
                                    }
                                />
                                <Name>{collection.name}</Name>
                            </Box>
                        ) : (
                            ""
                        )}
                    </Seasons>
                ),
        };

        return (
            <>
                <Nav>
                    <List>
                        {tabs.map((info, id) => {
                            return (
                                <Tab
                                    active={this.props.activeTab === id}
                                    key={id}
                                    onClick={() => this.props.tabHandler(id)}
                                >
                                    {info}
                                </Tab>
                            );
                        })}
                    </List>
                </Nav>
                {tab[this.props.activeTab]}
            </>
        );
    }
}
