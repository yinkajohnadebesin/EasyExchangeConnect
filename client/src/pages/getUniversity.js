import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ContainerTextFlip } from "../components/ui/container-text-flip";
import { CardContainer, CardBody, CardItem } from "../components/ui/3d-card";
import UD_Background from "../assets/statics/UD_Background.jpg"; 

function UniversityDetail() {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch detail of specific university
  useEffect(() => {
    axios.get(`http://localhost:3001/universities/${id}`)
      .then(res => {
        setUniversity(res.data);
        setLoading(false);
      })
      .catch(err => {
        // debugging error
        console.error("Error fetching university:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading university details...</p>;
  if (!university) return <p>University not found.</p>;

  return (
      <div className="relative min-h-screen font-nunito">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat bg-fixed opacity-95 z-0"
          style={{ backgroundImage: `url(${UD_Background})` }}
        />
    
        {/* Foreground content */}
        <div className="relative z-10 px-6 md:px-10 pt-10 text-black">
          <h1 className="text-6xl font-extrabold text-white">{university.University_Name}</h1>
          <h3 className="text-2xl text-white">{university.Title}</h3>
          <h4 className="text-[#fcba03] italic font-extrabold">{university.City_Name}, {university.Country_Name}</h4>
          <br></br>
          <p className="text-white">{university.Description}</p>
          <h4 className="mt-6 mb-2 text-xl font-bold text-[#03fc1c]">Eligible Degree Programmes</h4>
          {university.Programmes.length > 0 ? (
            <ContainerTextFlip
              words={university.Programmes}
              interval={2500}
              className="mx-auto"
              textClassName="text-white"
            />
          ) : (
            <p className="text-[#fc0303] font-extrabold">No TUD programmes available at this university.</p>
          )}
    
          <h4 className="mt-8 mb-4 text-2xl font-bold text-white">Photo Gallery</h4>
        </div>
        <div className="relative z-10 flex flex-wrap gap-6 justify-center pb-12">
          {university.Images.map((img, index) => (
            <CardContainer key={index} containerClassName="!py-8">
              <CardBody className="!w-80 !h-60">
                <CardItem
                  translateZ={20}
                  rotateX={1}
                  rotateY={-2}
                  className="rounded-2xl overflow-hidden shadow-lg"
                >
                  <img
                    src={`http://localhost:3001${img.Image_URL}`}
                    alt={img.Caption || 'University Image'}
                    className="w-full h-full object-cover"
                  />
                </CardItem>
                <CardItem
                  translateZ={30}
                  className="text-center mt-2 text-white font-medium"
                >
                  {img.Caption}
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
  );  
}

export default UniversityDetail;