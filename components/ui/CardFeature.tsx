// import React from 'react'
// import { CardItem } from './3d-card';

// /**
//  * 3D Card Feature component for the premium card
//  */
// const CardFeature = ({
//   icon,
//   title,
//   description,
//   translateZ = 40
// }: {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
//   translateZ?: number;
// }) => {
//   return (
//     <CardItem
//       translateZ={translateZ}
//       className="flex gap-3 p-3 rounded-lg w-full"
//     >
//       <div className="flex-shrink-0 p-2 rounded-full bg-[#FD5A1E]/20 text-[#FD5A1E]">
//         {icon}
//       </div>
//       <div className="flex-1">
//         <h4 className="font-medium mb-1 text-[#FD5A1E]">
//           {title}
//         </h4>
//         <p className="text-[#A5ACAF] text-sm">
//           {description}
//         </p>
//       </div>
//     </CardItem>
//   );
// };

// export default CardFeature