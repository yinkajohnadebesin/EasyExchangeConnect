const {
    // GETS
    getAllUniCodesById,
    getAllUniversities,
    getUniversityById,
    getUniversityProgrammes,
    getUniversityImages,
    getCityAndCountryByUniversity,
    getFirstUniversityImage,
    // CREATES
    insertUniversity,
    makeUniProgrammeCode,
    addUniImage,
    // DELETES
    deleteUniversityImages,
    deleteUniversityById,
    deleteCityById,
    deleteCountryById,
    deleteProgrammeCodeByUni,
    deleteImageByUrl,
    // MISCALLANEOUS
    isCityUsed,
    isCountryUsed,
    // UPDATES
    editUniversityById,
} = require("../models/universityModel");

const { insertCountry } = require("../models/countryModel");
const { insertCity } = require("../models/cityModel");
const path = require("path");
const fs = require("fs");

// remove a university programme code from the database.
const removeUniProgrammeCode = async (req, res) => {
    const { id } = req.params;
    const { code } = req.params;

    try {
        // triggers the deleteProgrammeCodeByUni function from universityModel.js
        await deleteProgrammeCodeByUni(id, code);
        const updatedCodes = await getAllUniCodesById(id);

        res.status(200).json({ message: "Programme code deleted successfully.", codes: updatedCodes });
    } catch (err) {
        console.error("Error deleting programme code:", err);
        res.status(500).json({ message: "Failed to delete programme code.", error: err });
    }
};

// add a new university programme code to the database.
const addProgrammeCode = async (req, res) => {
    const universityId = req.params.id;
    const { Programme_Code } = req.body;

    if (!Programme_Code) {
        return res.status(400).json({ message: "Programme code is required." });
    }

    try {
        // triggers the makeUniProgrammeCode function from universityModel.js
        await makeUniProgrammeCode(universityId, Programme_Code);
        // triggers the getAllUniCodesById function from universityModel.js
        const updatedProgrammes = await getAllUniCodesById(universityId);
        res.status(201).json({ message: "Programme code added.", codes: updatedProgrammes });
    } catch (err) {
        console.error("Error adding programme code:", err);
        res.status(500).json({ message: "Failed to add programme code", error: err });
    }
};

// update a university's information in the database.
const changeUni = async (req, res) => {
    const uniId = req.params.id;
    const { University_Name, Title, City_ID, Description, Caption } = req.body;
    const uniImageFile = req.file;

    try {
        const updatedUniResult = await editUniversityById({
            University_ID: uniId,
            University_Name,
            Title,
            City_ID,
            Description,
            Caption
        });

        if (uniImageFile) {
            const uniImageDirectoryPath = `/uploads/universities/${uniImageFile.filename}`;
            await addUniImage(uniId, uniImageDirectoryPath, `${Caption}`);
        }

        res.status(200).json({
            message: "University was updated successfully!", result: updatedUniResult
        });

    } catch (err) {
        console.error("Something went wrong updating this university:", err);
        res.status(500).json({ message: "There has been a failure updating the university", error: err });
    }
}

// get all universities from the database.
const getUniversities = async (req, res) => {
    try {
      const universities = await getAllUniversities();
  
      const universitiesWithImages = await Promise.all(
        universities.map(async (uni) => {
          const firstImage = await getFirstUniversityImage(uni.University_ID);
          return {
            ...uni,
            Image_URL: firstImage ? firstImage.Image_URL : null,
          };
        })
      );
  
      res.json(universitiesWithImages);
    } catch (err) {
      console.error("Error fetching universities with images:", err);
      res.status(500).json({ message: "Error fetching universities", error: err });
    }
  };

// get a specific university by its ID from the database.
const getUniversity = async (req, res) => {
    const universityId = req.params.id;

    try {
        // triggeres these functions from universityModel.js
        const university = await getUniversityById(universityId);
        const programmes = await getUniversityProgrammes(universityId);
        const images = await getUniversityImages(universityId);

        res.json({
            ...university,
            Programmes: programmes.map(p => p.Programme_Code),
            Images: images
        });
    } catch (err) {
        res.status(404).json({ message: "University not found", error: err });
    }
};

// create a new university in the database.
const createUniversity = async (req, res) => {
    let {
        University_Name,
        Title,
        Description,
        City_ID,
        new_city,
        new_country,
        country_id
    } = req.body;

    try {
        // 1. Insert new country if provided
        if (new_country) {
            country_id = await insertCountry(new_country);
        }

        // 2. Insert new city if provided (with the correct country_id)
        if (new_city) {
            City_ID = await insertCity(new_city, country_id);
        }

        // 3. Insert university
        const result = await insertUniversity({ University_Name, Title, City_ID, Description });

        res.status(201).json({ message: "University added successfully", universityId: result.insertId });

    } catch (err) {
        console.error("Error inserting university:", err);
        res.status(500).json({ message: "Error adding university", error: err });
    }
};

const deleteUniversity = async (req, res) => {
    const universityId = req.params.id;

    try {
        const { City_ID, Country_ID } = await getCityAndCountryByUniversity(universityId);
        // triggers these functions from universityModel.js
        await deleteUniversityImages(universityId);
        await deleteUniversityById(universityId);

        // Check if the city is still used after deleting the university
        const cityStillUsed = await isCityUsed(City_ID);
        if (!cityStillUsed) {
            await deleteCityById(City_ID);

            // Check if the country is still used after deleting the city
            const countryStillUsed = await isCountryUsed(Country_ID);
            if (!countryStillUsed) {
                await deleteCountryById(Country_ID);
                return res.status(200).json({ message: "University, city, and country deleted successfully." });
            }

            return res.status(200).json({ message: "University and city deleted. Country still in use." });
        }

        res.status(200).json({ message: "University deleted. City and country still in use." });

    } catch (error) {
        console.error("Error deleting university:", error);
        res.status(500).json({ message: "Failed to delete university", error });
    }
};

// delete a university image from the database and filesystem.
const deleteUniversityImage = async (req, res) => {
    const universityId = req.params.id;
    const { imageUrl } = req.body;
  
    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL is required." });
    }
  
    try {
      // Delete from DB
      await deleteImageByUrl(universityId, imageUrl);
  
      // Delete file from filesystem
      const absolutePath = path.join(__dirname, "..", imageUrl);
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
      }
  
      // Get updated images
      const updatedImages = await getUniversityImages(universityId);
  
      res.status(200).json({
        message: "Image deleted successfully.",
        images: updatedImages
      });
    } catch (err) {
      console.error("Error deleting image:", err);
      res.status(500).json({ message: "Failed to delete image", error: err });
    }
};

module.exports = {
    // GETS
    getUniversities,
    getUniversity,
    // CREATES
    addProgrammeCode,
    createUniversity,
    // DELETES
    deleteUniversity,
    removeUniProgrammeCode,
    deleteUniversityImage,
    // UPDATES
    changeUni,
};