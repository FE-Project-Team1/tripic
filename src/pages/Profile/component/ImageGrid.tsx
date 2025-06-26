import React from 'react';
// import grid1 from '/public/images/grid1.png';
// import grid2 from '/public/images/grid2.png';
// import grid3 from '/public/images/grid3.png';
// import grid4 from '/public/images/grid4.png';
// import grid5 from '/public/images/grid5.png';
// import grid6 from '/public/images/grid6.png';
// import grid7 from '/public/images/grid7.png';
// import grid8 from '/public/images/grid8.png';
// import grid9 from '/public/images/grid9.png';
import iconLayers from '../../../assets/iccon-img-layers.png';

function ImageGrid(): React.ReactElement {
  const IMAGE_SOURCES: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <ul className="grid grid-cols-3 gap-[8px] pt-5">
      {IMAGE_SOURCES.map((elem: number, index: number) => (
        <li
          key={index}
          className={
            'w-full h-full bg-gray-200 overflow-hidden relative group aspect-square'
          }
          aria-label={`Grid Image ${index + 1}`}
        >
          <img
            src={'https://placehold.co/400'}
            alt={`Grid item ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
          {(index === 0 || index === 1 || index === 5) && (
            <div className="absolute top-0.5 right-0.5 rounded-md p-1 flex items-center justify-center">
              <img
                src={iconLayers}
                alt="Show multiple images"
                className="w-6 h-6"
              />
            </div>
          )}
          ;
        </li>
      ))}
    </ul>
  );
}

export default ImageGrid;
