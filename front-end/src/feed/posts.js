import React from "react";
import { useEffect, useState } from 'react';

import { Post } from "../components/post";

export function Posts(){
    return(
        <div class="container p-5">
            <h3 className="text-light">Publicaciones</h3>
            <hr className="text-light"/>
            <div class="row hidden-md-up">
                <Post 
                    image={"https://dummyimage.com/300x300/000/fff"}
                    description={"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."}
                ></Post>
                <Post 
                    image={"https://dummyimage.com/300x300/000/fff"}
                    description={"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."}
                ></Post>
                <Post 
                    image={"https://dummyimage.com/300x300/000/fff"}
                    description={"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."}
                ></Post>
                <Post 
                    image={"https://dummyimage.com/300x300/000/fff"}
                    description={"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."}
                ></Post>
            </div>
        </div>
    )
}