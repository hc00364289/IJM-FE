import React from 'react';
import 'react-placeholder/lib/reactPlaceholder.css';

import { MappingIcon, ValidationIcon, DataUseIcon } from '../svgIcons';

export const ProjectSearchResults = () => {
  const imageHeight = '5rem';
  function MappingCard({ image, title, description }: Object) {
    return (
      <div className="w-third-l w-100 dib fl ph2-l pv3">
        <div className="shadow-4 mh2">
          <div className="pa4 ph3-m">
            <div className="red dib">{image}</div>
            <h4 className="blue-dark b">{title}</h4>
            <p className="blue-grey">{description}</p>
          </div>
        </div>
      </div>
    );
  }
  const cards = [
    {
      image: <MappingIcon style={{ height: imageHeight }} />,
      title: 'FIRST CITY PROJECT',
      description:
        'IJM Properties First Completed Project Residential Projects In Kukatpally With All Luxurious Facilities And CRDA Approved Apartments & Flats At Kukatpally, Hyderabad,Gated Community Flats In Kukatpally',
    },
    {
      image: <ValidationIcon style={{ height: imageHeight }} />,
      title: 'SECOND CITY PROJECT',
      description:
        'Raintree Park Dwaraka Krishna ( Phase II ) – Willows Grande Is A Unique Luxury Apartments Community In 5 Acres Of Prime Land With Stunningly Designed 632 Apartments. Willows Grande Is An Expansion To Current Phase I Of Raintree Park Dwaraka Krishna Situated Opposite To Acharya Nagarjuna University In Amaravathi The New Capital Region Of A. P, Located On Vijayawada - Guntur NH-5 Highway.',
    },
    {
      image: <DataUseIcon style={{ height: imageHeight }} />,
      title: 'RTP VIJAYAWADA',
      description:
        'Raintree Park Dwaraka Krishna ( Phase II ) – Willows Grande Is A Unique Luxury Apartments Community In 5 Acres Of Prime Land With Stunningly Designed 632 Apartments. Willows Grande Is An Expansion To Current Phase I Of Raintree Park Dwaraka Krishna Situated Opposite To Acharya Nagarjuna University In Amaravathi The New Capital Region Of A. P, Located On Vijayawada - Guntur NH-5 Highway.',
    },
  ];

  return (
    <div>
      <div className="cf">
        {cards.map((card, n) => (
          <MappingCard {...card} key={n} />
        ))}
      </div>
    </div>
  );
};
