import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import App from "../App";
import Header from "../Pages/Header";
import Restaurants from "../Pages/Restaurants";
import RecommendationComponent from "../Pages/components/RecommendationComponent";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/Header">
                <Header/>
            </ComponentPreview>
            <ComponentPreview path="/Restaurations">
                <Restaurants/>
            </ComponentPreview>
            <ComponentPreview
                path="/RecommendationComponent">
                <RecommendationComponent/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;