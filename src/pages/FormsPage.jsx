import React, {useState} from 'react';
import {Box, FormControl, MenuItem, Select, Typography} from "@mui/material";
import UserFormSelect from "../components/UserFormSelect";
import {loginInputStyles} from "../services/inputStyles";
import useSWR from "swr";
import {getAllRecords} from "../services/airtable";
import Loader from "../components/Loader";
import {colors} from "../assets/styles/colors";
import BlogPostForm from "../components/forms/BlogPostForm";
import ResearchResult from "../components/ResearchResult";
import CosOutputs from "../components/CosOutputs";
import CosImages from "../components/CosImages";
import CustomSlide from "../components/CustomSlide";
import CosSelectedImage from "../components/CosSelectedImage";
import CosFinal from "../components/CosFinal";
import PageHeader from "../components/PageHeader";

const FormsPage = () => {
	const [person, setPerson] = useState('');
	const [selectedValues, setSelectedValues] = useState([]);
	const {data = [], error, isLoading, mutate} = useSWR('/persons', () => getAllRecords());
	const [steps, setSteps] = useState(0);
	const [research, setResearch] = useState('');

// 	const [research, setResearch] = useState(`Allgemeine Blogging-Statistiken
//
//
// #### Wie viele aktive Blogs gibt es weltweit, und wie viele neue Blogs werden täglich erstellt?
//
// Laut einer Studie von 2020 gibt es etwa 600 Millionen Blogs im Internet, obwohl diese Zahl ständig steigt (Quelle: HostingFacts).
// Es werden täglich etwa 500.000 neue Blog-Beiträge veröffentlicht (Quelle: WordPress).
//
//
// #### Welcher Anteil der Internetnutzer liest regelmäßig Blogs?
//
// Etwa 77% der Internetnutzer lesen Blogs, was zeigt, dass Bloggen eine weit verbreitete Online-Aktivität ist (Quelle: HubSpot).
//
//
// Blogging-Erfolg und Traffic
//
//
// #### Welche Metriken verwenden Unternehmen am häufigsten, um den Erfolg ihres Blog-Contents zu messen (z.B. organischer Traffic, Suchmaschinen-Rankings)?
//
// Die wichtigsten Metriken für den Erfolg von Blog-Inhalten sind organischer Traffic, Suchmaschinen-Rankings, Seitenaufrufe, Unique Visitors und die Zeit auf der Seite (Quelle: SEMrush).
//
//
// #### Wie oft sollten Blogger neue Inhalte veröffentlichen, um starke Ergebnisse zu erzielen?
//
// Es gibt keine feste Regel für die Veröffentlichungshäufigkeit, aber regelmäßige Veröffentlichungen (z.B. wöchentlich oder zweimal pro Woche) können helfen, die Leserbindung zu erhöhen und Suchmaschinen zu befriedigen (Quelle: Moz).
//
//
// SEO und Content-Optimierung
//
//
// #### Welche Auswirkung hat die Verwendung von Schlüsselwörtern auf den Erfolg von Blog-Beiträgen?
//
// Die strategische Verwendung von Schlüsselwörtern kann die Sichtbarkeit in Suchmaschinen erheblich verbessern und den organischen Traffic steigern. Es ist wichtig, relevante und spezifische Schlüsselwörter zu verwenden (Quelle: Ahrefs).
//
//
// #### Wie beeinflusst die Länge eines Blog-Beitrags die Anzahl der organischen Besucher und Backlinks?
//
// Längere Blog-Beiträge (typischerweise zwischen 1.000 und 2.000 Wörtern) tendieren dazu, mehr Backlinks und höheren organischen Traffic zu generieren, da sie oft als umfassender und wertvoller angesehen werden (Quelle: Backlinko).
//
//
// Visual Content und Interaktion
//
//
// #### Wie viel mehr Traffic und Engagement erhalten Blog-Beiträge mit Bildern oder Videos im Vergleich zu textbasierten Beiträgen?
//
// Blog-Beiträge mit Bildern oder Videos können bis zu 94% mehr Views und Shares erhalten als textbasierte Beiträge (Quelle: Social Media Examiner).
//
//
// #### Welche Art von Headlines oder Titeltypen führen zu mehr sozialen Teilen und organic Traffic?
//
// Headlines mit Fragen, Zahlen oder Versprechungen von Wert (z.B., "Die Top 10 Tipps...") führen oft zu mehr sozialen Teilen und höherem organischen Traffic (Quelle: BuzzSumo).
//
//
// Zielgruppe und Leserverhalten
//
//
// #### Wie lange verbringen Leser im Durchschnitt mit dem Lesen eines Blog-Beitrags, und wie oft skimming sie den Inhalt anstelle eines gründlichen Lesens?
//
// Durchschnittlich verbringen Leser etwa 37 Sekunden mit dem Lesen eines Blog-Beitrags. Viele Leser skimming den Inhalt; nur etwa 20% der Leser lesen den gesamten Artikel (Quelle: Nielsen Norman Group).
//
//
// #### Welche Arten von Inhalten bevorzugen Leser in Deutschland, und wie wichtig sind Themen wie Bildung und Anleitungen für sie?
//
// In Deutschland bevorzugen Leser oft Inhalte zu Themen wie Gesundheit, Finanzen, Technologie und Bildung. Anleitungen und How-to-Artikel sind besonders beliebt, da sie praktischen Nutzen bieten (Quelle: Statista).
//
//
// Diese Informationen sollten Ihnen helfen, Ihre Blog-Post-Themen zu strukturieren und relevante Statistiken für Ihre Zielgruppe bereitzustellen.`);


	// const [airId, setAirId] = useState('recKDVIbUbaRD47vR');
	const [airId, setAirId] = useState(null)
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
						// sx={loginInputStyles}
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
				/>
			</CustomSlide>
			<CustomSlide
				condition={steps === 2}
			>
				<ResearchResult {...{research, setResearch, airId, setSteps}}/>
			</CustomSlide>
			<CustomSlide
				condition={steps === 3}
			>
				<CosOutputs {...{airId, setSteps}} />
			</CustomSlide>
			<CustomSlide
				condition={steps === 4}
			>
				<CosImages {...{airId, setSteps,selectedImageId, setSelectedImageId}} />
			</CustomSlide>
			<CustomSlide
				condition={steps === 5}
			>
				<CosSelectedImage {...{airId, setSteps, selectedImageId}} />
			</CustomSlide>
			<CustomSlide
				condition={steps === 6}
			>
				<CosFinal {...{airId, selectedImageId}} />
			</CustomSlide>
		</Box>
	);
};

export default FormsPage;
