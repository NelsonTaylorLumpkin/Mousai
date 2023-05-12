
import React, { useState } from 'react';
import { useEffect } from 'react';
import { addFollow, getFollower } from '../modules/followManager';
import { useParams } from 'react-router-dom';
function Follow() {

    let { idoftarget } = useParams();
    return (
        <div></div >
    );
}
export default Follow;




