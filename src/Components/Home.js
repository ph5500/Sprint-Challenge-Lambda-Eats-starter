import React from "react";
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <h1>Lambda Eats</h1>
            <p>Order pizza here!</p>
            <link to={"/pizza"}>
                <div>
                    Let's make a Pizza
</div>



            </link>
        </div>
    )
}

export default Home;