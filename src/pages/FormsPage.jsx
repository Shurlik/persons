import React, {useState} from 'react';
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import UserFormSelect from "../components/UserFormSelect";
import useSWR from "swr";
import {getAllRecords} from "../services/airtable";
import Loader from "../components/Loader";
import BlogPostForm from "../components/forms/BlogPostForm";
import ResearchResult from "../components/ResearchResult";
import CosOutputs from "../components/CosOutputs";
import CosImages from "../components/CosImages";
import CustomSlide from "../components/CustomSlide";
import CosSelectedImage from "../components/CosSelectedImage";
import CosFinal from "../components/CosFinal";
import PageHeader from "../components/PageHeader";
import CosOutline from "../components/CosOutline";

const FormsPage = () => {
	const [person, setPerson] = useState('');
	const [selectedValues, setSelectedValues] = useState([]);
	const {data = [], error, isLoading, mutate} = useSWR('/persons', () => getAllRecords());
	const [steps, setSteps] = useState(0);
	const [research, setResearch] = useState('');
	const [outline, setOutline] = useState('');
	const [prompt, setPrompt] = useState('');
	const [final, setFinal] = useState('');


// 	const [research, setResearch] = useState(`1. Welcher Prozentsatz von Hunden über 10 Jahren an Krebs erkrankt?
//
//
// Cancer is a significant health issue in older dogs. According to various studies, it is estimated that approximately 50% of dogs over the age of 10 will develop some form of cancer.
//
//
//
// Source: The American Kennel Club Canine Health Foundation notes that "it's estimated that 1 in 4 dogs will develop cancer in their lifetime, and nearly 50% of dogs over age 10 will develop cancer." [1]
//
//
// 2. Welche Hunderassen haben das höchste Risiko, an Krebs zu erkranken?
//
//
// Certain breeds are more prone to developing cancer due to genetic factors. Some of the breeds with a higher risk include:
//
//
//
// Golden Retrievers: Known for their high incidence of hemangiosarcoma and lymphoma.
// Labrador Retrievers: Prone to osteosarcoma (bone cancer) and mast cell tumors.
// German Shepherds: At risk for hemangiosarcoma and lymphoma.
// Rottweilers: High incidence of osteosarcoma.
//
//
// Source: The Veterinary Information Network (VIN) states, "Certain breeds are at higher risk for specific types of cancer," listing several breeds including Golden Retrievers, Labrador Retrievers, German Shepherds, and Rottweilers. [2]
//
//
// 3. Wie oft tritt Krebs bei großen und extra-großen Hunden im Vergleich zu kleineren Hunden auf?
//
//
// Larger dogs tend to have a higher incidence of certain types of cancer compared to smaller dogs. For example:
//
//
//
// Osteosarcoma (bone cancer) is more common in large and giant breeds.
// Hemangiosarcoma is also more prevalent in larger breeds.
//
//
// Source: A study published in the "Journal of Veterinary Internal Medicine" found that larger dogs have a significantly higher risk for osteosarcoma compared to smaller dogs. [3]
//
//
// 4. Welche Arten von Krebs sind bei Hunden am häufigsten und wie oft treten sie auf?
//
//
// The most common types of cancer in dogs include:
//
//
//
// Lymphoma: Accounts for about 10-20% of all canine cancers.
// Melanoma: Common in dogs, especially those with dark skin.
// Mast Cell Tumors: One of the most common skin cancers in dogs.
// Osteosarcoma (Bone Cancer): Most common primary bone tumor in dogs.
// Hemangiosarcoma: A blood vessel cancer that affects larger breeds more frequently.
//
//
// Source: The American College of Veterinary Internal Medicine (ACVIM) provides detailed information on these common types of canine cancers. [4]
//
//
// 5. Wie wirksam sind neue Bluttests wie NuQ™ und OncoK9™ bei der Früherkennung von Krebs bei Hunden?
//
//
// New blood tests such as NuQ™ and OncoK9™ are being developed to aid in early detection of cancer in dogs. While these tests show promise, their effectiveness can vary based on several factors including sensitivity, specificity, and the type of cancer being detected.
//
//
//
// For example:
//
// The OncoK9 test uses liquid biopsy technology to detect circulating tumor DNA (ctDNA) and has shown promising results in detecting various types of canine cancers at an early stage.
//
//
// However, it's important to note that these tests are still under research and validation.
//
//
//
// Source: PetDx, the company behind OncoK9, provides information on its website regarding the test's capabilities and ongoing research. [5]
//
//
// References
// [1] American Kennel Club Canine Health Foundation - "Cancer in Dogs"
//
// [2] Veterinary Information Network - "Cancer in Dogs"
//
// [3] Journal of Veterinary Internal Medicine - "Incidence Rates of Osteosarcoma in Dogs"
//
// [4] American College of Veterinary Internal Medicine - "Common Types of Canine Cancers"
//
// [5] PetDx - "OncoK9 Test Information"
//
//
//
// These sources provide a solid foundation for understanding the prevalence, risk factors, common types, and early detection methods related to cancer in dogs.`);


	// const [airId, setAirId] = useState('recfTCxri6Vfih3Z6');
	const [airId, setAirId] = useState(null);
	const [selectedImageId, setSelectedImageId] = useState(null);


	const handleChange = async (event) => {
		setPerson(event.target.value);
	};

	const persons = !isLoading ? data.map((p) => <MenuItem
		key={p?.id}
		value={p}
	>{p?.fields?.Name}</MenuItem>) : <MenuItem value={null}><Loader/></MenuItem>;

	return (
		<Box
			sx={{
				justifyContent: 'center',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				overflow: 'hidden',
			}}
		>
			<CustomSlide
				condition={steps === 0}
			>
				<PageHeader
					header={'Select person to continue'}
					sx={{flexGrow: 1}}
				/>
				<FormControl
					sx={{
						marginBottom: '1rem',
						marginTop: '3rem',
						width: '100%'
					}}
					variant='standard'
				>
					<Select
						fullWidth
						variant={'outlined'}
						labelId='demo-simple-select-standard-label'
						value={person}
						onChange={handleChange}
						label='Person'
					>
						<MenuItem value={''}>
							<em>None</em>
						</MenuItem>
						{persons}
					</Select>
				</FormControl>
				{!!person && <UserFormSelect
					person={person}
					selectedValues={selectedValues}
					setSelectedValues={setSelectedValues}
					setSteps={setSteps}
					steps={steps}
				/>}
			</CustomSlide>
			<CustomSlide
				condition={steps === 1}
			>
				<BlogPostForm
					person={person}
					selectedValues={selectedValues}
					setResearch={setResearch}
					setSteps={setSteps}
					setAirId={setAirId}
					steps={steps}
				/>
			</CustomSlide>
			<CustomSlide
				condition={steps === 2}
			>
				<ResearchResult {...{research, setResearch, airId, setSteps, steps, outline, setOutline}}/>
			</CustomSlide>
			<CustomSlide
				condition={steps === 3}
			>
				<CosOutline {...{airId, setSteps, steps, outline, setOutline, setFinal}} />
			</CustomSlide>
			<CustomSlide
				condition={steps === 4}
			>
				<CosOutputs {...{airId, setSteps, steps, final, setFinal}} />
			</CustomSlide>
			<CustomSlide
				condition={steps === 5}
			>
				<CosImages {...{airId, setSteps, selectedImageId, setSelectedImageId, steps, prompt, setPrompt}} />
			</CustomSlide>
			<CustomSlide
				condition={steps === 6}
			>
				<CosSelectedImage {...{airId, setSteps, selectedImageId, steps, prompt, setPrompt}} />
			</CustomSlide>
			<CustomSlide
				condition={steps === 7}
			>
				<CosFinal {...{airId, selectedImageId, steps, setSteps}} />
			</CustomSlide>
		</Box>
	);
};

export default FormsPage;
