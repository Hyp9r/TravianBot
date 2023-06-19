interface Gameworld {
    uuid: string;
    domain: string;
    region: string;
    name: string;
    url: string;
    registrationClosed: boolean;
    registrationKeyRequired: boolean;
    hidden: boolean;
    start: number;
    end: number | null;
    mainpageBackground: string;
    subtitle: string;
    speed: string;
    mainpageGroups: string[];
}

export default Gameworld;