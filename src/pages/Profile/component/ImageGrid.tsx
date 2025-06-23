import React from 'react';
import grid1 from '../../../assets/grid1.png';
import grid2 from '../../../assets/grid2.png';
import grid3 from '../../../assets/grid3.png';
import grid4 from '../../../assets/grid4.png';
import grid5 from '../../../assets/grid5.png';
import grid6 from '../../../assets/grid6.png';
import grid7 from '../../../assets/grid7.png';
import grid8 from '../../../assets/grid8.png';
import grid9 from '../../../assets/grid9.png';
import iconLayers from '../../../assets/iccon-img-layers.png';

interface IImageGridProps {}

function ImageGrid({}: IImageGridProps): React.ReactElement {
  const IMAGE_SOURCES: string[] = [
    grid1,
    grid2,
    grid3,
    grid4,
    grid5,
    grid6,
    grid7,
    grid8,
    grid9,
  ];

  return (
    <ul className="grid grid-cols-3 gap-[10px] list-none p-0 m-0 px-4 pt-4">
      {IMAGE_SOURCES.map((src: string, index: number) => (
        <li
          key={index}
          className="w-[114px] h-[114px] bg-gray-200 overflow-hidden relative group"
          aria-label={`Grid Image ${index + 1}`}
        >
          <img
            src={src}
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
        </li>
      ))}
    </ul>
  );
}

export default ImageGrid;