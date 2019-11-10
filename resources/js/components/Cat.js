// FROM https://github.com/drewswaycool/react-cats
import React from 'react';

function Cat(props) {
    console.log(props);
    const { type = '',
            text = '%20',
            fontSize = '50',
            color = 'white',
            filter = '',
            width = '',
            height = ''
          } = props;
  
    const uniqueNum = Math.random();
    const url = `https://cataas.com/cat/${type}/says/${text}?s=${fontSize}&c=${color}&filter=${filter}&width=${width}&height=${height}&uniqueNum=${uniqueNum}`;
  
    return (
      <img src={url} />
    )
  
  }
  
  export default Cat