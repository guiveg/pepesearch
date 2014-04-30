/*
  Copyright (c) 2013-2014, Guillermo Vega-Gorgojo & Simen Heggestøyl
  All rights reserved
 */

// Ideally, these data structures should be periodically created with a script.
// It is not very difficult, the idea is to replicate the SPARQL queries proposed
// in the analysis of the Semicolon dataset


/*
 jsonSemicolonTypes contains all the types employed in the Semicolon dataset.
 Every type has:
 1) an id
 2) a URI
 3) a label
 4) an id of a readable datatype property for displaying purpose
 */
var jsonTypes = [
    {
        "id": "org_Enhet",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/Enhet",
        "label": {"en": "Organization", "nb": "Organisasjon"}, 
        "display": "org_navn",
        "primary": true
    }, {
        "id": "nac_Nacekode",
        "uri": "http://data.computas.com/informasjonsmodell/nace/Nacekode",
        "label": {"en": "Sector", "nb": "Sektor"},
        "display": "nace_tittel",
        "primary": true
    }, {
        "id": "org_Enhetskode",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/Enhetskode",
        "label": {"en": "Organizational form", "nb": "Enhetskode"},
        "display": "rdf_label",
        "primary": true
    }, {
        "id": "org_AntAnsattePaDato",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/AntAnsattePåDato",
        "label": {"en": "Number of employees at date", "nb": "Antall ansatte på dato"},
        "display": "org_antAnsatte",
        "primary": false
    }, {
        "id": "lok_Kommune",
        "uri": "http://data.computas.com/informasjonsmodell/lokasjon/Kommune",
        "label": {"en": "Municipality", "nb": "Kommune"},
        "display": "lok_navn",
        "primary": true
    }, {
        "id": "lok_Adresse",
        "uri": "http://data.computas.com/informasjonsmodell/lokasjon/Adresse",
        "label": {"en": "Address", "nb": "Adresse"}, 
        "display": "lok_adressebeskrivelse",
        "primary": false
    }, {
        "id": "lok_Poststed",
        "uri": "http://data.computas.com/informasjonsmodell/lokasjon/Poststed",
        "label": {"en": "Place", "nb": "Poststed"},
        "display": "lok_pnavn",
        "primary": false
    }, {
        "id": "reg_Regnskap",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/Regnskap",
        "label": {"en": "Accounting", "nb": "Regnskap"},
        "display": "reg_ar",
        "primary": true
    }, {
        "id": "org_Rolle",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/Rolle",
        "label": {"en": "Role", "nb": "Rolle"},
        "display": "org_dato",
        "primary": true
    }, {
        "id": "org_Rolletype",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/Rolletype",
        "label": {"en": "Role type", "nb": "Rolletype"},
        "display": "rdf_label",
        "primary": true
    }, {
        "id": "org_Person",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/Person",
        "label": {"en": "Person", "nb": "Person"},
        "display": "org_navn",
        "primary": true
    }, {
        "id": "nace_70_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/70.2",
        "label": {
            "nb": "Administrativ rådgivning",
            "en": "Management consultancy activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_46",
        "uri": "http://data.computas.com/informasjonsmodell/nace/46",
        "label": {
            "nb": "Agentur- og engroshandel, unntatt med motorvogner",
            "en": "Wholesale trade, except of motor vehicles and motorcycles"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_46_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/46.1",
        "label": {
            "nb": "Agenturhandel",
            "en": "Wholesale on a fee or contract basis"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_94_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/94.9",
        "label": {
            "nb": "Aktiviteter i andre medlemsorganisasjoner",
            "en": "Activities of other membership organisations"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_94",
        "uri": "http://data.computas.com/informasjonsmodell/nace/94",
        "label": {
            "nb": "Aktiviteter i medlemsorganisasjoner",
            "en": "Activities of membership organisations"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_03_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/03.2",
        "label": {
            "nb": "Akvakultur",
            "en": "Aquaculture"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_86_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/86.9",
        "label": {
            "nb": "Andre helsetjenester",
            "en": "Other human health activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_63_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/63.9",
        "label": {
            "nb": "Andre informasjonstjenester",
            "en": "Other information service activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_87_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/87.9",
        "label": {
            "nb": "Andre omsorgsinstitusjoner",
            "en": "Other residential care activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_78_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/78.3",
        "label": {
            "nb": "Andre personaladministrative tjenester",
            "en": "Other human resources provision"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_53_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/53.2",
        "label": {
            "nb": "Andre post- og budtjenester",
            "en": "Other postal and courier activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_88_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/88.9",
        "label": {
            "nb": "Andre sosialtjenester uten botilbud",
            "en": "Other social work activities without accommodation"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_52_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/52.2",
        "label": {
            "nb": "Andre tjenester tilknyttet transport",
            "en": "Support activities for transportation"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_42",
        "uri": "http://data.computas.com/informasjonsmodell/nace/42",
        "label": {
            "nb": "Anleggsvirksomhet",
            "en": "Civil engineering"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_79_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/79.9",
        "label": {
            "nb": "Annen arrangørvirksomhet og tilknyttede tjenester",
            "en": "Other reservation service and related activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_24_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/24.3",
        "label": {
            "nb": "Annen bearbeiding av jern og stål",
            "en": "Manufacture of other products of first processing of steel"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_08_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/08.9",
        "label": {
            "nb": "Annen bryting og utvinning",
            "en": "Mining and quarrying n.e.c."
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_47_7",
        "uri": "http://data.computas.com/informasjonsmodell/nace/47.7",
        "label": {
            "nb": "Annen butikkhandel i spesialforretninger",
            "en": "Retail sale of other goods in specialised stores"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_74",
        "uri": "http://data.computas.com/informasjonsmodell/nace/74",
        "label": {
            "nb": "Annen faglig, vitenskapelig og teknisk virksomhet",
            "en": "Other professional, scientific and technical activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_74_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/74.9",
        "label": {
            "nb": "Annen faglig, vitenskapelig og teknisk virksomhet",
            "en": "Other professional, scientific and technical activities n.e.c."
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_64_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/64.9",
        "label": {
            "nb": "Annen finansieringsvirksomhet",
            "en": "Other financial service activities, except insurance and pension funding"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_82",
        "uri": "http://data.computas.com/informasjonsmodell/nace/82",
        "label": {
            "nb": "Annen forretningsmessig tjenesteyting",
            "en": "Office administrative, office support and other business support activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_32",
        "uri": "http://data.computas.com/informasjonsmodell/nace/32",
        "label": {
            "nb": "Annen industriproduksjon",
            "en": "Other manufacturing"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_49_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/49.3",
        "label": {
            "nb": "Annen landtransport med passasjerer",
            "en": "Other passenger land transport"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_55_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/55.9",
        "label": {
            "nb": "Annen overnatting",
            "en": "Other accommodation"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_96",
        "uri": "http://data.computas.com/informasjonsmodell/nace/96",
        "label": {
            "nb": "Annen personlig tjenesteyting",
            "en": "Other personal service activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_96_0",
        "uri": "http://data.computas.com/informasjonsmodell/nace/96.0",
        "label": {
            "nb": "Annen personlig tjenesteyting",
            "en": "Other personal service activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_43_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/43.9",
        "label": {
            "nb": "Annen spesialisert bygge- og anleggsvirksomhet",
            "en": "Other specialised construction activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_S",
        "uri": "http://data.computas.com/informasjonsmodell/nace/S",
        "label": {
            "nb": "Annen tjenesteyting",
            "en": "Other services activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_85_5",
        "uri": "http://data.computas.com/informasjonsmodell/nace/85.5",
        "label": {
            "nb": "Annen undervisning",
            "en": "Other education"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_73_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/73.1",
        "label": {
            "nb": "Annonse- og reklamevirksomhet",
            "en": "Advertising"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_73",
        "uri": "http://data.computas.com/informasjonsmodell/nace/73",
        "label": {
            "nb": "Annonse- og reklamevirksomhet og markedsundersøkelser",
            "en": "Advertising and market research"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_78",
        "uri": "http://data.computas.com/informasjonsmodell/nace/78",
        "label": {
            "nb": "Arbeidskrafttjenester",
            "en": "Employment activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_94_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/94.2",
        "label": {
            "nb": "Arbeidstakerorganisasjoner",
            "en": "Activities of trade unions"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_71_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/71.1",
        "label": {
            "nb": "Arkitektvirksomhet og teknisk konsulentvirksomhet",
            "en": "Architectural and engineering activities and related technical consultancy"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_71",
        "uri": "http://data.computas.com/informasjonsmodell/nace/71",
        "label": {
            "nb": "Arkitektvirksomhet og teknisk konsulentvirksomhet, og teknisk prøving og analyse",
            "en": "Architectural and engineering activities; technical testing and analysis"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_02_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/02.2",
        "label": {
            "nb": "Avvirkning",
            "en": "Logging"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_64_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/64.1",
        "label": {
            "nb": "Bankvirksomhet",
            "en": "Monetary intermediation"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_10_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/10.2",
        "label": {
            "nb": "Bearbeiding og konservering av fisk, skalldyr og bløtdyr",
            "en": "Processing and preserving of fish, crustaceans and molluscs"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_10_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/10.3",
        "label": {
            "nb": "Bearbeiding og konservering av frukt og grønnsaker",
            "en": "Processing and preserving of fruit and vegetables"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_13_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/13.1",
        "label": {
            "nb": "Bearbeiding og spinning av tekstilfibrer",
            "en": "Preparation and spinning of textile fibres"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_38_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/38.2",
        "label": {
            "nb": "Behandling og disponering av avfall",
            "en": "Waste treatment and disposal"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_81_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/81.3",
        "label": {
            "nb": "Beplantning av hager og parkanlegg",
            "en": "Landscape service activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_15_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/15.1",
        "label": {
            "nb": "Beredning av lær, produksjon av reiseeffekter og salmakerartikler og beredning og farging av pelsskinn",
            "en": "Tanning and dressing of leather; manufacture of luggage, handbags, saddlery and harness; dressing and dyeing of fur"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_B",
        "uri": "http://data.computas.com/informasjonsmodell/nace/B",
        "label": {
            "nb": "Bergverksdrift og utvinning",
            "en": "Mining and quarrying"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_05_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/05.2",
        "label": {
            "nb": "Bryting av brunkull",
            "en": "Mining of lignite"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_07_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/07.2",
        "label": {
            "nb": "Bryting av ikke-jernholdig malm",
            "en": "Mining of non-ferrous metal ores"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_07_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/07.1",
        "label": {
            "nb": "Bryting av jernmalm",
            "en": "Mining of iron ores"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_07",
        "uri": "http://data.computas.com/informasjonsmodell/nace/07",
        "label": {
            "nb": "Bryting av metallholdig malm",
            "en": "Mining of metal ores"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_08_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/08.1",
        "label": {
            "nb": "Bryting av stein, utvinning av sand og leire",
            "en": "Quarrying of stone, sand and clay"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_05_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/05.1",
        "label": {
            "nb": "Bryting av steinkull",
            "en": "Mining of hard coal"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_05",
        "uri": "http://data.computas.com/informasjonsmodell/nace/05",
        "label": {
            "nb": "Bryting av steinkull og brunkull",
            "en": "Mining of coal and lignite"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_08",
        "uri": "http://data.computas.com/informasjonsmodell/nace/08",
        "label": {
            "nb": "Bryting og bergverksdrift ellers",
            "en": "Other mining and quarrying"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_47_4",
        "uri": "http://data.computas.com/informasjonsmodell/nace/47.4",
        "label": {
            "nb": "Butikkhandel med IKT-utstyr i spesialforretninger",
            "en": "Retail sale of information and communication equipment in specialised stores"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_47_5",
        "uri": "http://data.computas.com/informasjonsmodell/nace/47.5",
        "label": {
            "nb": "Butikkhandel med andre husholdningsvarer i spesialforretninger",
            "en": "Retail sale of other household equipment in specialised stores"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_47_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/47.1",
        "label": {
            "nb": "Butikkhandel med bredt vareutvalg",
            "en": "Retail sale in non-specialised stores"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_47_6",
        "uri": "http://data.computas.com/informasjonsmodell/nace/47.6",
        "label": {
            "nb": "Butikkhandel med bøker, musikkartikler og andre fritidsartikler i spesialforretninger",
            "en": "Retail sale of cultural and recreation goods in specialised stores"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_47_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/47.2",
        "label": {
            "nb": "Butikkhandel med nærings- og nytelsesmidler i spesialforretninger",
            "en": "Retail sale of food, beverages and tobacco in specialised stores"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_F",
        "uri": "http://data.computas.com/informasjonsmodell/nace/F",
        "label": {
            "nb": "Bygge- og anleggsvirksomhet",
            "en": "Construction"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_42_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/42.9",
        "label": {
            "nb": "Bygging av andre anlegg",
            "en": "Construction of other civil engineering projects"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_30_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/30.1",
        "label": {
            "nb": "Bygging av skip og båter",
            "en": "Building of ships and boats"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_42_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/42.2",
        "label": {
            "nb": "Bygging av vann- og kloakkanlegg, og anlegg for elektrisitet og telekommunikasjon",
            "en": "Construction of utility projects"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_42_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/42.1",
        "label": {
            "nb": "Bygging av veier og jernbaner",
            "en": "Construction of roads and railways"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_56_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/56.2",
        "label": {
            "nb": "Cateringvirksomhet og kantiner drevet som selvstendig virksomhet",
            "en": "Event catering and other food service activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_35_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/35.3",
        "label": {
            "nb": "Damp- og varmtvannsforsyning",
            "en": "Steam and air conditioning supply"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_63_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/63.1",
        "label": {
            "nb": "Databehandling, datalagring og tilknyttede tjenester, drift av web-portaler",
            "en": "Data processing, hosting and related activities; web portals"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_47_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/47.3",
        "label": {
            "nb": "Detaljhandel med drivstoff til motorvogner",
            "en": "Retail sale of automotive fuel in specialised stores"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_47_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/47.9",
        "label": {
            "nb": "Detaljhandel utenom utsalgssted",
            "en": "Retail trade not in stores, stalls or markets"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_47",
        "uri": "http://data.computas.com/informasjonsmodell/nace/47",
        "label": {
            "nb": "Detaljhandel, unntatt med motorvogner",
            "en": "Retail trade, except of motor vehicles and motorcycles"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_56_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/56.3",
        "label": {
            "nb": "Drift av barer",
            "en": "Beverage serving activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_91",
        "uri": "http://data.computas.com/informasjonsmodell/nace/91",
        "label": {
            "nb": "Drift av biblioteker, arkiver, museer og annen kulturvirksomhet",
            "en": "Libraries, archives, museums and other cultural activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_91_0",
        "uri": "http://data.computas.com/informasjonsmodell/nace/91.0",
        "label": {
            "nb": "Drift av biblioteker, arkiver, museer og annen kulturvirksomhet",
            "en": "Libraries, archives, museums and other cultural activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_55_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/55.3",
        "label": {
            "nb": "Drift av campingplasser",
            "en": "Camping grounds, recreational vehicle parks and trailer parks"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_55_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/55.2",
        "label": {
            "nb": "Drift av vandrerhjem og ferieleiligheter",
            "en": "Holiday and other short-stay accommodation"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_01_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/01.1",
        "label": {
            "nb": "Dyrking av ettårige vekster",
            "en": "Growing of non-perennial crops"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_01_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/01.2",
        "label": {
            "nb": "Dyrking av flerårige vekster",
            "en": "Growing of perennial crops"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_D",
        "uri": "http://data.computas.com/informasjonsmodell/nace/D",
        "label": {
            "nb": "Elektrisitets-, gass-, damp- og varmtvannsforsyning",
            "en": "Electricity, gas, steam and air conditioning supply"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_35",
        "uri": "http://data.computas.com/informasjonsmodell/nace/35",
        "label": {
            "nb": "Elektrisitets-, gass-, damp- og varmtvannsforsyning",
            "en": "Electricity, gas, steam and air conditioning supply"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_43_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/43.2",
        "label": {
            "nb": "Elektrisk installasjonsarbeid, VVS-arbeid og annet installasjonsarbeid",
            "en": "Electrical, plumbing and other construction installation activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_46_5",
        "uri": "http://data.computas.com/informasjonsmodell/nace/46.5",
        "label": {
            "nb": "Engroshandel med IKT-utstyr",
            "en": "Wholesale of information and communication equipment"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_46_6",
        "uri": "http://data.computas.com/informasjonsmodell/nace/46.6",
        "label": {
            "nb": "Engroshandel med andre maskiner og annet utstyr",
            "en": "Wholesale of other machinery, equipment and supplies"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_46_4",
        "uri": "http://data.computas.com/informasjonsmodell/nace/46.4",
        "label": {
            "nb": "Engroshandel med husholdningsvarer og varer til personlig bruk",
            "en": "Wholesale of household goods"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_46_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/46.2",
        "label": {
            "nb": "Engroshandel med jordbruksråvarer og levende dyr",
            "en": "Wholesale of agricultural raw materials and live animals"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_46_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/46.3",
        "label": {
            "nb": "Engroshandel med nærings- og nytelsesmidler",
            "en": "Wholesale of food, beverages and tobacco"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_46_7",
        "uri": "http://data.computas.com/informasjonsmodell/nace/46.7",
        "label": {
            "nb": "Engroshandel med spesialisert vareutvalg ellers",
            "en": "Other specialised wholesale"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_13_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/13.3",
        "label": {
            "nb": "Etterbehandling av tekstiler",
            "en": "Finishing of textiles"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_80_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/80.3",
        "label": {
            "nb": "Etterforsking",
            "en": "Investigation activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_M",
        "uri": "http://data.computas.com/informasjonsmodell/nace/M",
        "label": {
            "nb": "Faglig, vitenskapelig og teknisk tjenesteyting",
            "en": "Professional, scientific and technical activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_43_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/43.3",
        "label": {
            "nb": "Ferdiggjøring av bygninger",
            "en": "Building completion and finishing"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_59",
        "uri": "http://data.computas.com/informasjonsmodell/nace/59",
        "label": {
            "nb": "Film-, video- og fjernsynsprogramproduksjon, utgivelse av musikk- og lydopptak",
            "en": "Motion picture, video and television programme production, sound recording and music publishing activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_K",
        "uri": "http://data.computas.com/informasjonsmodell/nace/K",
        "label": {
            "nb": "Finansierings- og forsikringsvirksomhet",
            "en": "Financial and insurance activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_64",
        "uri": "http://data.computas.com/informasjonsmodell/nace/64",
        "label": {
            "nb": "Finansieringsvirksomhet",
            "en": "Financial service activities, except insurance and pension funding"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_03_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/03.1",
        "label": {
            "nb": "Fiske og fangst",
            "en": "Fishing"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_03",
        "uri": "http://data.computas.com/informasjonsmodell/nace/03",
        "label": {
            "nb": "Fiske, fangst og akvakultur",
            "en": "Fishing and aquaculture"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_60_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/60.2",
        "label": {
            "nb": "Fjernsynskringkasting",
            "en": "Television programming and broadcasting activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_66_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/66.3",
        "label": {
            "nb": "Fondsforvaltningsvirksomhet",
            "en": "Fund management activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_58",
        "uri": "http://data.computas.com/informasjonsmodell/nace/58",
        "label": {
            "nb": "Forlagsvirksomhet",
            "en": "Publishing activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_N",
        "uri": "http://data.computas.com/informasjonsmodell/nace/N",
        "label": {
            "nb": "Forretningsmessig tjenesteyting",
            "en": "Administrative and support service activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_82_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/82.9",
        "label": {
            "nb": "Forretningsmessig tjenesteyting ikke nevnt annet sted",
            "en": "Business support service activities n.e.c."
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_65_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/65.1",
        "label": {
            "nb": "Forsikring",
            "en": "Insurance"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_65",
        "uri": "http://data.computas.com/informasjonsmodell/nace/65",
        "label": {
            "nb": "Forsikringsvirksomhet og pensjonskasser, unntatt trygdeordninger underlagt offentlig forvaltning",
            "en": "Insurance, reinsurance and pension funding, except compulsory social security"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_72",
        "uri": "http://data.computas.com/informasjonsmodell/nace/72",
        "label": {
            "nb": "Forskning og utviklingsarbeid",
            "en": "Scientific research and development"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_72_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/72.1",
        "label": {
            "nb": "Forskning og utviklingsarbeid innen naturvitenskap og teknikk",
            "en": "Research and experimental development on natural sciences and engineering"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_72_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/72.2",
        "label": {
            "nb": "Forskning og utviklingsarbeid innen samfunnsvitenskap og humanistiske fag",
            "en": "Research and experimental development on social sciences and humanities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_74_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/74.2",
        "label": {
            "nb": "Fotografvirksomhet",
            "en": "Photographic activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_93_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/93.2",
        "label": {
            "nb": "Fritidsaktiviteter og drift av fornøyelsesetablissementer",
            "en": "Amusement and recreation activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_85_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/85.1",
        "label": {
            "nb": "Førskoleundervisning",
            "en": "Pre-primary education"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_65_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/65.2",
        "label": {
            "nb": "Gjenforsikring",
            "en": "Reinsurance"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_49_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/49.2",
        "label": {
            "nb": "Godstransport med jernbane",
            "en": "Freight rail transport"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_50_4",
        "uri": "http://data.computas.com/informasjonsmodell/nace/50.4",
        "label": {
            "nb": "Godstransport på elver og innsjøer",
            "en": "Inland freight water transport"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_49_4",
        "uri": "http://data.computas.com/informasjonsmodell/nace/49.4",
        "label": {
            "nb": "Godstransport på vei, herunder flyttetransport",
            "en": "Freight transport by road and removal services"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_85_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/85.2",
        "label": {
            "nb": "Grunnskoleundervisning",
            "en": "Primary education"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_45_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/45.3",
        "label": {
            "nb": "Handel med deler og utstyr til motorvogner, unntatt motorsykler",
            "en": "Sale of motor vehicle parts and accessories"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_45_4",
        "uri": "http://data.computas.com/informasjonsmodell/nace/45.4",
        "label": {
            "nb": "Handel med motorsykler, deler og utstyr. Vedlikehold og reparasjon av motorsykler",
            "en": "Sale, maintenance and repair of motorcycles and related parts and accessories"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_45_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/45.1",
        "label": {
            "nb": "Handel med motorvogner, unntatt motorsykler",
            "en": "Sale of motor vehicles"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_45",
        "uri": "http://data.computas.com/informasjonsmodell/nace/45",
        "label": {
            "nb": "Handel med og reparasjon av motorvogner",
            "en": "Wholesale and retail trade and repair of motor vehicles and motorcycles"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_Q",
        "uri": "http://data.computas.com/informasjonsmodell/nace/Q",
        "label": {
            "nb": "Helse- og sosialtjenester",
            "en": "Human health and social work activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_86",
        "uri": "http://data.computas.com/informasjonsmodell/nace/86",
        "label": {
            "nb": "Helsetjenester",
            "en": "Human health activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_23_7",
        "uri": "http://data.computas.com/informasjonsmodell/nace/23.7",
        "label": {
            "nb": "Hogging og bearbeiding av monument- og bygningsstein",
            "en": "Cutting, shaping and finishing of stone"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_64_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/64.2",
        "label": {
            "nb": "Holdingselskaper",
            "en": "Activities of holding companies"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_55_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/55.1",
        "label": {
            "nb": "Hotellvirksomhet",
            "en": "Hotels and similar accommodation"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_70_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/70.1",
        "label": {
            "nb": "Hovedkontortjenester",
            "en": "Activities of head offices"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_70",
        "uri": "http://data.computas.com/informasjonsmodell/nace/70",
        "label": {
            "nb": "Hovedkontortjenester, administrativ rådgivning",
            "en": "Activities of head offices; management consultancy activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_01_4",
        "uri": "http://data.computas.com/informasjonsmodell/nace/01.4",
        "label": {
            "nb": "Husdyrhold",
            "en": "Growing of sugar cane"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_C",
        "uri": "http://data.computas.com/informasjonsmodell/nace/C",
        "label": {
            "nb": "Industri",
            "en": "Manufacturing"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_32_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/32.9",
        "label": {
            "nb": "Industriproduksjon ikke nevnt annet sted",
            "en": "Manufacturing n.e.c."
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_J",
        "uri": "http://data.computas.com/informasjonsmodell/nace/J",
        "label": {
            "nb": "Informasjon og kommunikasjon",
            "en": "Information and communication"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_63",
        "uri": "http://data.computas.com/informasjonsmodell/nace/63",
        "label": {
            "nb": "Informasjonstjenester",
            "en": "Information service activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_38_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/38.1",
        "label": {
            "nb": "Innsamling av avfall",
            "en": "Waste collection"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_02_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/02.3",
        "label": {
            "nb": "Innsamling av viltvoksende produkter av annet enn tre",
            "en": "Growing of citrus fruits"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_38",
        "uri": "http://data.computas.com/informasjonsmodell/nace/38",
        "label": {
            "nb": "Innsamling, behandling, disponering og gjenvinning av avfall",
            "en": "Waste collection, treatment and disposal activities; materials recovery"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_33_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/33.2",
        "label": {
            "nb": "Installasjon av industrimaskiner og -utstyr",
            "en": "Installation of industrial machinery and equipment"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_87_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/87.3",
        "label": {
            "nb": "Institusjoner og bofellesskap innen omsorg for eldre og funksjonshemmede",
            "en": "Residential care activities for the elderly and disabled"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_87_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/87.2",
        "label": {
            "nb": "Institusjoner og bofellesskap innen omsorg for psykisk utviklingshemmede, psykisk helsearbeid og rusmiddelomsorg",
            "en": "Residential care activities for mental retardation, mental health and substance abuse"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_U",
        "uri": "http://data.computas.com/informasjonsmodell/nace/U",
        "label": {
            "nb": "Internasjonale organisasjoner og organer",
            "en": "Activities of extraterritorial organisations and bodies"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_99",
        "uri": "http://data.computas.com/informasjonsmodell/nace/99",
        "label": {
            "nb": "Internasjonale organisasjoner og organer",
            "en": "Activities of extraterritorial organisations and bodies"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_99_0",
        "uri": "http://data.computas.com/informasjonsmodell/nace/99.0",
        "label": {
            "nb": "Internasjonale organisasjoner og organer",
            "en": "Activities of extraterritorial organisations and bodies"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_01_7",
        "uri": "http://data.computas.com/informasjonsmodell/nace/01.7",
        "label": {
            "nb": "Jakt, viltstell og tjenester tilknyttet jakt og viltstell",
            "en": "Hunting, trapping and related service activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_01",
        "uri": "http://data.computas.com/informasjonsmodell/nace/01",
        "label": {
            "nb": "Jordbruk og tjenester tilknyttet jordbruk, jakt og viltstell",
            "en": "Crop and animal production, hunting and related service activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_A",
        "uri": "http://data.computas.com/informasjonsmodell/nace/A",
        "label": {
            "nb": "Jordbruk, skogbruk og fiske",
            "en": "Agriculture, forestry and fishing"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_69",
        "uri": "http://data.computas.com/informasjonsmodell/nace/69",
        "label": {
            "nb": "Juridisk og regnskapsmessig tjenesteyting",
            "en": "Legal and accounting activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_69_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/69.1",
        "label": {
            "nb": "Juridisk tjenesteyting",
            "en": "Legal activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_61_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/61.1",
        "label": {
            "nb": "Kabelbasert telekommunikasjon",
            "en": "Wired telecommunications activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_68_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/68.1",
        "label": {
            "nb": "Kjøp og salg av egen fast eiendom",
            "en": "Buying and selling of own real estate"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_01_5",
        "uri": "http://data.computas.com/informasjonsmodell/nace/01.5",
        "label": {
            "nb": "Kombinert husdyrhold og planteproduksjon",
            "en": "Mixed farming"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_81_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/81.1",
        "label": {
            "nb": "Kombinerte tjenester tilknyttet eiendomsdrift",
            "en": "Combined facilities support activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_82_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/82.3",
        "label": {
            "nb": "Kongress-, messe- og utstillingsvirksomhet",
            "en": "Organisation of conventions and trade shows"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_82_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/82.1",
        "label": {
            "nb": "Kontortjenester",
            "en": "Office administrative and support activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_R",
        "uri": "http://data.computas.com/informasjonsmodell/nace/R",
        "label": {
            "nb": "Kulturell virksomhet, underholdning og fritidsaktiviteter",
            "en": "Arts, entertainment and recreation"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_90",
        "uri": "http://data.computas.com/informasjonsmodell/nace/90",
        "label": {
            "nb": "Kunstnerisk virksomhet og underholdningsvirksomhet",
            "en": "Creative, arts and entertainment activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_90_0",
        "uri": "http://data.computas.com/informasjonsmodell/nace/90.0",
        "label": {
            "nb": "Kunstnerisk virksomhet og underholdningsvirksomhet",
            "en": "Creative, arts and entertainment activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_52_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/52.1",
        "label": {
            "nb": "Lagring",
            "en": "Warehousing and storage"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_52",
        "uri": "http://data.computas.com/informasjonsmodell/nace/52",
        "label": {
            "nb": "Lagring og andre tjenester tilknyttet transport",
            "en": "Warehousing and support activities for transportation"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_53_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/53.1",
        "label": {
            "nb": "Landsdekkende posttjenester",
            "en": "Postal activities under universal service obligation"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_49",
        "uri": "http://data.computas.com/informasjonsmodell/nace/49",
        "label": {
            "nb": "Landtransport og rørtransport",
            "en": "Land transport and transport via pipelines"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_77_4",
        "uri": "http://data.computas.com/informasjonsmodell/nace/77.4",
        "label": {
            "nb": "Leasing av immateriell eiendom og lignende produkter, unntatt opphavsrettsbeskyttede verker",
            "en": "Leasing of intellectual property and similar products, except copyrighted works"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_86_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/86.2",
        "label": {
            "nb": "Lege- og tannlegetjenester",
            "en": "Medical and dental practice activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_92",
        "uri": "http://data.computas.com/informasjonsmodell/nace/92",
        "label": {
            "nb": "Lotteri og totalisatorspill",
            "en": "Gambling and betting activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_92_0",
        "uri": "http://data.computas.com/informasjonsmodell/nace/92.0",
        "label": {
            "nb": "Lotteri og totalisatorspill",
            "en": "Gambling and betting activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_51",
        "uri": "http://data.computas.com/informasjonsmodell/nace/51",
        "label": {
            "nb": "Lufttransport",
            "en": "Air transport"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_51_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/51.2",
        "label": {
            "nb": "Lufttransport med gods samt romfart",
            "en": "Freight air transport and space transport"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_51_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/51.1",
        "label": {
            "nb": "Lufttransport med passasjerer",
            "en": "Passenger air transport"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_T",
        "uri": "http://data.computas.com/informasjonsmodell/nace/T",
        "label": {
            "nb": "Lønnet arbeid i private husholdninger",
            "en": "Activities of households as employers; undifferentiated goods - and services - producing activities of households for own use"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_97",
        "uri": "http://data.computas.com/informasjonsmodell/nace/97",
        "label": {
            "nb": "Lønnet arbeid i private husholdninger",
            "en": "Activities of households as employers of domestic personnel"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_97_0",
        "uri": "http://data.computas.com/informasjonsmodell/nace/97.0",
        "label": {
            "nb": "Lønnet arbeid i private husholdninger",
            "en": "Activities of households as employers of domestic personnel"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_73_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/73.2",
        "label": {
            "nb": "Markeds- og opinionsundersøkelser",
            "en": "Market research and public opinion polling"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_38_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/38.3",
        "label": {
            "nb": "Materialgjenvinning",
            "en": "Materials recovery"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_39",
        "uri": "http://data.computas.com/informasjonsmodell/nace/39",
        "label": {
            "nb": "Miljørydding, miljørensing og lignende virksomhet",
            "en": "Remediation activities and other waste management services"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_39_0",
        "uri": "http://data.computas.com/informasjonsmodell/nace/39.0",
        "label": {
            "nb": "Miljørydding, miljørensing og lignende virksomhet",
            "en": "Remediation activities and other waste management services"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_94_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/94.1",
        "label": {
            "nb": "Næringslivs- og arbeidsgiverorganisasjoner og yrkessammenslutninger",
            "en": "Activities of business, employers and professional membership organisations"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_O",
        "uri": "http://data.computas.com/informasjonsmodell/nace/O",
        "label": {
            "nb": "Offentlig administrasjon og forsvar, og trygdeordninger underlagt offentlig forvaltning",
            "en": "Public administration and defence; compulsory social security"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_84",
        "uri": "http://data.computas.com/informasjonsmodell/nace/84",
        "label": {
            "nb": "Offentlig administrasjon og forsvar, og trygdeordninger underlagt offentlig forvaltning",
            "en": "Public administration and defence; compulsory social security"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_84_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/84.1",
        "label": {
            "nb": "Offentlig administrasjon og forvaltning",
            "en": "Administration of the State and the economic and social policy of the community"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_84_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/84.2",
        "label": {
            "nb": "Offentlig administrasjon tilknyttet utenriks- og sikkerhetssaker",
            "en": "Provision of services to the community as a whole"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_L",
        "uri": "http://data.computas.com/informasjonsmodell/nace/L",
        "label": {
            "nb": "Omsetning og drift av fast eiendom",
            "en": "Real estate activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_68",
        "uri": "http://data.computas.com/informasjonsmodell/nace/68",
        "label": {
            "nb": "Omsetning og drift av fast eiendom",
            "en": "Real estate activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_68_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/68.3",
        "label": {
            "nb": "Omsetning og drift av fast eiendom på oppdrag",
            "en": "Real estate activities on a fee or contract basis"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_41",
        "uri": "http://data.computas.com/informasjonsmodell/nace/41",
        "label": {
            "nb": "Oppføring av bygninger",
            "en": "Construction of buildings"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_41_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/41.2",
        "label": {
            "nb": "Oppføring av bygninger",
            "en": "Construction of residential and non-residential buildings"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_37",
        "uri": "http://data.computas.com/informasjonsmodell/nace/37",
        "label": {
            "nb": "Oppsamling og behandling av avløpsvann",
            "en": "Sewerage"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_37_0",
        "uri": "http://data.computas.com/informasjonsmodell/nace/37.0",
        "label": {
            "nb": "Oppsamling og behandling av avløpsvann",
            "en": "Sewerage"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_25_6",
        "uri": "http://data.computas.com/informasjonsmodell/nace/25.6",
        "label": {
            "nb": "Overflatebehandling og bearbeiding av metaller",
            "en": "Treatment and coating of metals; machining"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_I",
        "uri": "http://data.computas.com/informasjonsmodell/nace/I",
        "label": {
            "nb": "Overnattings- og serveringsvirksomhet",
            "en": "Accommodation and food service activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_55",
        "uri": "http://data.computas.com/informasjonsmodell/nace/55",
        "label": {
            "nb": "Overnattingsvirksomhet",
            "en": "Accommodation"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_74_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/74.3",
        "label": {
            "nb": "Oversettelses- og tolkevirksomhet",
            "en": "Translation and interpretation activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_49_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/49.1",
        "label": {
            "nb": "Passasjertransport med jernbane",
            "en": "Passenger rail transport, interurban"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_50_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/50.3",
        "label": {
            "nb": "Passasjertransport på elver og innsjøer",
            "en": "Inland passenger water transport"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_65_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/65.3",
        "label": {
            "nb": "Pensjonskasser",
            "en": "Pension funding"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_01_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/01.3",
        "label": {
            "nb": "Planteformering",
            "en": "Growing of vegetables and melons, roots and tubers"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_87",
        "uri": "http://data.computas.com/informasjonsmodell/nace/87",
        "label": {
            "nb": "Pleie- og omsorgstjenester i institusjon",
            "en": "Residential care activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_87_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/87.1",
        "label": {
            "nb": "Pleie- og omsorgstjenester i institusjon",
            "en": "Residential nursing care activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_53",
        "uri": "http://data.computas.com/informasjonsmodell/nace/53",
        "label": {
            "nb": "Post og distribusjonsvirksomhet",
            "en": "Postal and courier activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_80_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/80.1",
        "label": {
            "nb": "Private vakttjenester",
            "en": "Private security activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_23",
        "uri": "http://data.computas.com/informasjonsmodell/nace/23",
        "label": {
            "nb": "Produksjon av andre ikke-metallholdige mineralprodukter",
            "en": "Manufacture of other non-metallic mineral products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_20_5",
        "uri": "http://data.computas.com/informasjonsmodell/nace/20.5",
        "label": {
            "nb": "Produksjon av andre kjemiske produkter",
            "en": "Manufacture of other chemical products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_28_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/28.2",
        "label": {
            "nb": "Produksjon av andre maskiner og annet utstyr til generell bruk",
            "en": "Manufacture of other general-purpose machinery"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_25_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/25.9",
        "label": {
            "nb": "Produksjon av andre metallvarer",
            "en": "Manufacture of other fabricated metal products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_10_8",
        "uri": "http://data.computas.com/informasjonsmodell/nace/10.8",
        "label": {
            "nb": "Produksjon av andre næringsmidler",
            "en": "Manufacture of other food products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_23_4",
        "uri": "http://data.computas.com/informasjonsmodell/nace/23.4",
        "label": {
            "nb": "Produksjon av andre porselensprodukter og keramiske produkter",
            "en": "Manufacture of other porcelain and ceramic products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_24_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/24.2",
        "label": {
            "nb": "Produksjon av andre rør og rørdeler av stål",
            "en": "Manufacture of tubes, pipes, hollow profiles and related fittings, of steel"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_28_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/28.9",
        "label": {
            "nb": "Produksjon av andre spesialmaskiner",
            "en": "Manufacture of other special-purpose machinery"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_13_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/13.9",
        "label": {
            "nb": "Produksjon av andre tekstiler",
            "en": "Manufacture of other textiles"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_30",
        "uri": "http://data.computas.com/informasjonsmodell/nace/30",
        "label": {
            "nb": "Produksjon av andre transportmidler",
            "en": "Manufacture of other transport equipment"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_27_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/27.9",
        "label": {
            "nb": "Produksjon av annet elektrisk utstyr",
            "en": "Manufacture of other electrical equipment"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_10_7",
        "uri": "http://data.computas.com/informasjonsmodell/nace/10.7",
        "label": {
            "nb": "Produksjon av bakeri- og pastavarer",
            "en": "Manufacture of bakery and farinaceous products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_27_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/27.2",
        "label": {
            "nb": "Produksjon av batterier og akkumulatorer",
            "en": "Manufacture of batteries and accumulators"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_27_4",
        "uri": "http://data.computas.com/informasjonsmodell/nace/27.4",
        "label": {
            "nb": "Produksjon av belysningsutstyr",
            "en": "Manufacture of electric lighting equipment"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_23_6",
        "uri": "http://data.computas.com/informasjonsmodell/nace/23.6",
        "label": {
            "nb": "Produksjon av betong-, sement- og gipsprodukter",
            "en": "Manufacture of articles of concrete, cement and plaster"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_23_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/23.3",
        "label": {
            "nb": "Produksjon av byggevarer av brent leire",
            "en": "Manufacture of clay building materials"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_25_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/25.3",
        "label": {
            "nb": "Produksjon av dampkjeler, unntatt kjeler til sentralvarmeanlegg",
            "en": "Manufacture of steam generators, except central heating hot water boilers"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_26",
        "uri": "http://data.computas.com/informasjonsmodell/nace/26",
        "label": {
            "nb": "Produksjon av datamaskiner og elektroniske og optiske produkter",
            "en": "Manufacture of computer, electronic and optical products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_26_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/26.2",
        "label": {
            "nb": "Produksjon av datamaskiner og tilleggsutstyr",
            "en": "Manufacture of computers and peripheral equipment"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_29_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/29.3",
        "label": {
            "nb": "Produksjon av deler og utstyr til motorvogner",
            "en": "Manufacture of parts and accessories for motor vehicles"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_11",
        "uri": "http://data.computas.com/informasjonsmodell/nace/11",
        "label": {
            "nb": "Produksjon av drikkevarer",
            "en": "Manufacture of beverages"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_11_0",
        "uri": "http://data.computas.com/informasjonsmodell/nace/11.0",
        "label": {
            "nb": "Produksjon av drikkevarer",
            "en": "Manufacture of beverages"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_27",
        "uri": "http://data.computas.com/informasjonsmodell/nace/27",
        "label": {
            "nb": "Produksjon av elektrisk utstyr",
            "en": "Manufacture of electrical equipment"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_27_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/27.1",
        "label": {
            "nb": "Produksjon av elektromotorer, generatorer, transformatorer og elektriske fordelings- og kontrolltavler og paneler",
            "en": "Manufacture of electric motors, generators, transformers and electricity distribution and control apparatus"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_26_4",
        "uri": "http://data.computas.com/informasjonsmodell/nace/26.4",
        "label": {
            "nb": "Produksjon av elektronikk til husholdningsbruk",
            "en": "Manufacture of consumer electronics"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_26_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/26.1",
        "label": {
            "nb": "Produksjon av elektroniske komponenter og kretskort",
            "en": "Manufacture of electronic components and boards"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_21_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/21.2",
        "label": {
            "nb": "Produksjon av farmasøytiske preparater",
            "en": "Manufacture of pharmaceutical preparations"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_21_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/21.1",
        "label": {
            "nb": "Produksjon av farmasøytiske råvarer",
            "en": "Manufacture of basic pharmaceutical products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_21",
        "uri": "http://data.computas.com/informasjonsmodell/nace/21",
        "label": {
            "nb": "Produksjon av farmasøytiske råvarer og preparater",
            "en": "Manufacture of basic pharmaceutical products and pharmaceutical preparations"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_10_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/10.9",
        "label": {
            "nb": "Produksjon av fôrvarer",
            "en": "Manufacture of prepared animal feeds"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_35_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/35.2",
        "label": {
            "nb": "Produksjon av gass og distribusjon av gass gjennom ledningsnett",
            "en": "Manufacture of gas; distribution of gaseous fuels through mains"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_23_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/23.1",
        "label": {
            "nb": "Produksjon av glass og glassprodukter",
            "en": "Manufacture of glass and glass products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_32_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/32.1",
        "label": {
            "nb": "Produksjon av gull- og sølvvarer, bijouteri og lignende artikler",
            "en": "Manufacture of jewellery, bijouterie and related articles"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_22",
        "uri": "http://data.computas.com/informasjonsmodell/nace/22",
        "label": {
            "nb": "Produksjon av gummi- og plastprodukter",
            "en": "Manufacture of rubber and plastic products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_22_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/22.1",
        "label": {
            "nb": "Produksjon av gummiprodukter",
            "en": "Manufacture of rubber products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_27_5",
        "uri": "http://data.computas.com/informasjonsmodell/nace/27.5",
        "label": {
            "nb": "Produksjon av husholdningsmaskiner og -apparater",
            "en": "Manufacture of domestic appliances"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_24_4",
        "uri": "http://data.computas.com/informasjonsmodell/nace/24.4",
        "label": {
            "nb": "Produksjon av ikke-jernholdige metaller",
            "en": "Manufacture of basic precious and other non-ferrous metals"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_23_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/23.9",
        "label": {
            "nb": "Produksjon av ikke-metallholdige mineralprodukter ikke nevnt annet sted",
            "en": "Manufacture of abrasive products and non-metallic mineral products n.e.c."
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_23_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/23.2",
        "label": {
            "nb": "Produksjon av ildfaste produkter",
            "en": "Manufacture of refractory products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_24_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/24.1",
        "label": {
            "nb": "Produksjon av jern og stål, samt ferrolegeringer",
            "en": "Manufacture of basic iron and steel and of ferro-alloys"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_28_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/28.3",
        "label": {
            "nb": "Produksjon av jordbruks- og skogbruksmaskiner",
            "en": "Manufacture of agricultural and forestry machinery"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_29_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/29.2",
        "label": {
            "nb": "Produksjon av karosserier og tilhengere",
            "en": "Manufacture of bodies (coachwork) for motor vehicles; manufacture of trailers and semi-trailers"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_20",
        "uri": "http://data.computas.com/informasjonsmodell/nace/20",
        "label": {
            "nb": "Produksjon av kjemikalier og kjemiske produkter",
            "en": "Manufacture of chemicals and chemical products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_20_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/20.1",
        "label": {
            "nb": "Produksjon av kjemiske råvarer, gjødsel og nitrogenforbindelser, basisplast og syntetisk gummi",
            "en": "Manufacture of basic chemicals, fertilisers and nitrogen compounds, plastics and synthetic rubber in primary forms"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_25_7",
        "uri": "http://data.computas.com/informasjonsmodell/nace/25.7",
        "label": {
            "nb": "Produksjon av kjøkkenredskaper, skjære- og klipperedskaper, håndverktøy og andre jernvarer",
            "en": "Manufacture of cutlery, tools and general hardware"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_14",
        "uri": "http://data.computas.com/informasjonsmodell/nace/14",
        "label": {
            "nb": "Produksjon av klær",
            "en": "Manufacture of wearing apparel"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_14_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/14.3",
        "label": {
            "nb": "Produksjon av klær av trikotasje",
            "en": "Manufacture of knitted and crocheted apparel"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_14_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/14.1",
        "label": {
            "nb": "Produksjon av klær, unntatt pelsvarer",
            "en": "Manufacture of wearing apparel, except fur apparel"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_26_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/26.3",
        "label": {
            "nb": "Produksjon av kommunikasjonsutstyr",
            "en": "Manufacture of communication equipment"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_10_6",
        "uri": "http://data.computas.com/informasjonsmodell/nace/10.6",
        "label": {
            "nb": "Produksjon av kornvarer, stivelse og stivelsesprodukter",
            "en": "Manufacture of grain mill products, starches and starch products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_19",
        "uri": "http://data.computas.com/informasjonsmodell/nace/19",
        "label": {
            "nb": "Produksjon av kull- og raffinerte petroleumsprodukter",
            "en": "Manufacture of coke and refined petroleum products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_19_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/19.1",
        "label": {
            "nb": "Produksjon av kullprodukter",
            "en": "Manufacture of coke oven products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_20_6",
        "uri": "http://data.computas.com/informasjonsmodell/nace/20.6",
        "label": {
            "nb": "Produksjon av kunstfibrer",
            "en": "Manufacture of man-made fibres"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_27_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/27.3",
        "label": {
            "nb": "Produksjon av ledninger og ledningsmateriell",
            "en": "Manufacture of wiring and wiring devices"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_30_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/30.2",
        "label": {
            "nb": "Produksjon av lokomotiver og annet rullende materiell til jernbane og sporvei",
            "en": "Manufacture of railway locomotives and rolling stock"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_30_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/30.3",
        "label": {
            "nb": "Produksjon av luftfartøyer og romfartøyer og lignende utstyr",
            "en": "Manufacture of air and spacecraft and related machinery"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_15",
        "uri": "http://data.computas.com/informasjonsmodell/nace/15",
        "label": {
            "nb": "Produksjon av lær og lærvarer",
            "en": "Manufacture of leather and related products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_26_8",
        "uri": "http://data.computas.com/informasjonsmodell/nace/26.8",
        "label": {
            "nb": "Produksjon av magnetiske og optiske media",
            "en": "Manufacture of magnetic and optical media"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_20_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/20.3",
        "label": {
            "nb": "Produksjon av maling og lakk, trykkfarger og tetningsmidler",
            "en": "Manufacture of paints, varnishes and similar coatings, printing ink and mastics"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_28_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/28.1",
        "label": {
            "nb": "Produksjon av maskiner og utstyr til generell bruk",
            "en": "Manufacture of general-purpose machinery"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_28",
        "uri": "http://data.computas.com/informasjonsmodell/nace/28",
        "label": {
            "nb": "Produksjon av maskiner og utstyr til generell bruk, ikke nevnt annet sted",
            "en": "Manufacture of machinery and equipment n.e.c."
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_28_4",
        "uri": "http://data.computas.com/informasjonsmodell/nace/28.4",
        "label": {
            "nb": "Produksjon av maskiner til metallbearbeiding og annet maskinverktøy",
            "en": "Manufacture of metal forming machinery and machine tools"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_32_5",
        "uri": "http://data.computas.com/informasjonsmodell/nace/32.5",
        "label": {
            "nb": "Produksjon av medisinske og tanntekniske instrumenter og utstyr",
            "en": "Manufacture of medical and dental instruments and supplies"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_10_5",
        "uri": "http://data.computas.com/informasjonsmodell/nace/10.5",
        "label": {
            "nb": "Produksjon av meierivarer og iskrem",
            "en": "Manufacture of dairy products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_24",
        "uri": "http://data.computas.com/informasjonsmodell/nace/24",
        "label": {
            "nb": "Produksjon av metaller",
            "en": "Manufacture of basic metals"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_25_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/25.1",
        "label": {
            "nb": "Produksjon av metallkonstruksjoner",
            "en": "Manufacture of structural metal products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_25",
        "uri": "http://data.computas.com/informasjonsmodell/nace/25",
        "label": {
            "nb": "Produksjon av metallvarer, unntatt maskiner og utstyr",
            "en": "Manufacture of fabricated metal products, except machinery and equipment"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_30_4",
        "uri": "http://data.computas.com/informasjonsmodell/nace/30.4",
        "label": {
            "nb": "Produksjon av militære stridskjøretøyer",
            "en": "Manufacture of military fighting vehicles"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_29_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/29.1",
        "label": {
            "nb": "Produksjon av motorvogner",
            "en": "Manufacture of motor vehicles"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_29",
        "uri": "http://data.computas.com/informasjonsmodell/nace/29",
        "label": {
            "nb": "Produksjon av motorvogner og tilhengere",
            "en": "Manufacture of motor vehicles, trailers and semi-trailers"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_32_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/32.2",
        "label": {
            "nb": "Produksjon av musikkinstrumenter",
            "en": "Manufacture of musical instruments"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_26_5",
        "uri": "http://data.computas.com/informasjonsmodell/nace/26.5",
        "label": {
            "nb": "Produksjon av måle-, kontroll- og navigasjonsinstrumenter, og klokker og ur",
            "en": "Manufacture of instruments and appliances for measuring, testing and navigation; watches and clocks"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_31",
        "uri": "http://data.computas.com/informasjonsmodell/nace/31",
        "label": {
            "nb": "Produksjon av møbler",
            "en": "Manufacture of furniture"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_31_0",
        "uri": "http://data.computas.com/informasjonsmodell/nace/31.0",
        "label": {
            "nb": "Produksjon av møbler",
            "en": "Manufacture of furniture"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_10",
        "uri": "http://data.computas.com/informasjonsmodell/nace/10",
        "label": {
            "nb": "Produksjon av nærings- og nytelsesmidler",
            "en": "Manufacture of food products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_26_7",
        "uri": "http://data.computas.com/informasjonsmodell/nace/26.7",
        "label": {
            "nb": "Produksjon av optiske instrumenter og fotografisk utstyr",
            "en": "Manufacture of optical instruments and photographic equipment"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_17",
        "uri": "http://data.computas.com/informasjonsmodell/nace/17",
        "label": {
            "nb": "Produksjon av papir og papirvarer",
            "en": "Manufacture of paper and paper products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_17_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/17.1",
        "label": {
            "nb": "Produksjon av papirmasse, papir og papp",
            "en": "Manufacture of pulp, paper and paperboard"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_14_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/14.2",
        "label": {
            "nb": "Produksjon av pelsvarer",
            "en": "Manufacture of articles of fur"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_20_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/20.2",
        "label": {
            "nb": "Produksjon av plantevern- og skadedyrmidler og andre landbrukskjemiske produkter",
            "en": "Manufacture of pesticides and other agrochemical products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_22_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/22.2",
        "label": {
            "nb": "Produksjon av plastprodukter",
            "en": "Manufacture of plastics products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_19_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/19.2",
        "label": {
            "nb": "Produksjon av raffinerte petroleumsprodukter",
            "en": "Manufacture of refined petroleum products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_23_5",
        "uri": "http://data.computas.com/informasjonsmodell/nace/23.5",
        "label": {
            "nb": "Produksjon av sement, kalk og gips",
            "en": "Manufacture of cement, lime and plaster"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_15_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/15.2",
        "label": {
            "nb": "Produksjon av skotøy",
            "en": "Manufacture of footwear"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_32_4",
        "uri": "http://data.computas.com/informasjonsmodell/nace/32.4",
        "label": {
            "nb": "Produksjon av spill og leker",
            "en": "Manufacture of games and toys"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_32_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/32.3",
        "label": {
            "nb": "Produksjon av sportsartikler",
            "en": "Manufacture of sports goods"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_26_6",
        "uri": "http://data.computas.com/informasjonsmodell/nace/26.6",
        "label": {
            "nb": "Produksjon av strålingsutstyr, elektromedisinsk og elektroterapeutisk utstyr",
            "en": "Manufacture of irradiation, electromedical and electrotherapeutic equipment"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_20_4",
        "uri": "http://data.computas.com/informasjonsmodell/nace/20.4",
        "label": {
            "nb": "Produksjon av såpe og vaskemidler, rense- og polermidler, parfyme og toalettartikler",
            "en": "Manufacture of soap and detergents, cleaning and polishing preparations, perfumes and toilet preparations"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_25_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/25.2",
        "label": {
            "nb": "Produksjon av tanker, cisterner og andre beholdere av metall",
            "en": "Manufacture of tanks, reservoirs and containers of metal"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_13",
        "uri": "http://data.computas.com/informasjonsmodell/nace/13",
        "label": {
            "nb": "Produksjon av tekstiler",
            "en": "Manufacture of textiles"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_12",
        "uri": "http://data.computas.com/informasjonsmodell/nace/12",
        "label": {
            "nb": "Produksjon av tobakksvarer",
            "en": "Manufacture of tobacco products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_12_0",
        "uri": "http://data.computas.com/informasjonsmodell/nace/12.0",
        "label": {
            "nb": "Produksjon av tobakksvarer",
            "en": "Manufacture of tobacco products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_30_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/30.9",
        "label": {
            "nb": "Produksjon av transportmidler ikke nevnt annet sted",
            "en": "Manufacture of transport equipment n.e.c."
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_16",
        "uri": "http://data.computas.com/informasjonsmodell/nace/16",
        "label": {
            "nb": "Produksjon av trelast og varer av tre, kork, strå og flettematerialer, unntatt møbler",
            "en": "Manufacture of wood and of products of wood and cork, except furniture; manufacture of articles of straw and plaiting materials"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_17_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/17.2",
        "label": {
            "nb": "Produksjon av varer av papir og papp",
            "en": "Manufacture of articles of paper and paperboard"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_16_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/16.2",
        "label": {
            "nb": "Produksjon av varer av tre, kork, strå og flettematerialer",
            "en": "Manufacture of products of wood, cork, straw and plaiting materials"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_10_4",
        "uri": "http://data.computas.com/informasjonsmodell/nace/10.4",
        "label": {
            "nb": "Produksjon av vegetabilske og animalske oljer og fettstoffer",
            "en": "Manufacture of vegetable and animal oils and fats"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_25_4",
        "uri": "http://data.computas.com/informasjonsmodell/nace/25.4",
        "label": {
            "nb": "Produksjon av våpen og ammunisjon",
            "en": "Manufacture of weapons and ammunition"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_59_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/59.2",
        "label": {
            "nb": "Produksjon og utgivelse av musikk- og lydopptak",
            "en": "Sound recording and music publishing activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_10_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/10.1",
        "label": {
            "nb": "Produksjon, bearbeiding og konservering av kjøtt og kjøttvarer",
            "en": "Processing and preserving of meat and production of meat products"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_35_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/35.1",
        "label": {
            "nb": "Produksjon, overføring og distribusjon av elektrisitet",
            "en": "Electric power generation, transmission and distribution"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_60",
        "uri": "http://data.computas.com/informasjonsmodell/nace/60",
        "label": {
            "nb": "Radio- og fjernsynskringkasting",
            "en": "Programming and broadcasting activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_60_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/60.1",
        "label": {
            "nb": "Radiokringkasting",
            "en": "Radio broadcasting"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_69_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/69.2",
        "label": {
            "nb": "Regnskap, revisjon og skatterådgivning",
            "en": "Accounting, bookkeeping and auditing activities; tax consultancy"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_79_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/79.1",
        "label": {
            "nb": "Reisebyrå- og reisearrangørvirksomhet",
            "en": "Travel agency and tour operator activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_79",
        "uri": "http://data.computas.com/informasjonsmodell/nace/79",
        "label": {
            "nb": "Reisebyrå- og reisearrangørvirksomhet og tilknyttede tjenester",
            "en": "Travel agency, tour operator and other reservation service and related activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_78_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/78.1",
        "label": {
            "nb": "Rekruttering og formidling av arbeidskraft",
            "en": "Activities of employment placement agencies"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_81_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/81.2",
        "label": {
            "nb": "Rengjøringsvirksomhet",
            "en": "Cleaning activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_95_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/95.1",
        "label": {
            "nb": "Reparasjon av datamaskiner og kommunikasjonsutstyr",
            "en": "Repair of computers and communication equipment"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_95",
        "uri": "http://data.computas.com/informasjonsmodell/nace/95",
        "label": {
            "nb": "Reparasjon av datamaskiner, husholdningsvarer og varer til personlig bruk",
            "en": "Repair of computers and personal and household goods"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_95_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/95.2",
        "label": {
            "nb": "Reparasjon av husholdningsvarer og varer til personlig bruk",
            "en": "Repair of personal and household goods"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_33_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/33.1",
        "label": {
            "nb": "Reparasjon av metallvarer, maskiner og utstyr",
            "en": "Repair of fabricated metal products, machinery and equipment"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_33",
        "uri": "http://data.computas.com/informasjonsmodell/nace/33",
        "label": {
            "nb": "Reparasjon og installasjon av maskiner og utstyr",
            "en": "Repair and installation of machinery and equipment"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_18_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/18.2",
        "label": {
            "nb": "Reproduksjon av innspilte opptak",
            "en": "Reproduction of recorded media"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_56_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/56.1",
        "label": {
            "nb": "Restaurantvirksomhet",
            "en": "Restaurants and mobile food service activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_43_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/43.1",
        "label": {
            "nb": "Riving og grunnarbeid",
            "en": "Demolition and site preparation"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_49_5",
        "uri": "http://data.computas.com/informasjonsmodell/nace/49.5",
        "label": {
            "nb": "Rørtransport",
            "en": "Transport via pipeline"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_16_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/16.1",
        "label": {
            "nb": "Saging, høvling og impregnering av tre",
            "en": "Sawmilling and planing of wood"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_61_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/61.3",
        "label": {
            "nb": "Satellittbasert telekommunikasjon",
            "en": "Satellite telecommunications activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_56",
        "uri": "http://data.computas.com/informasjonsmodell/nace/56",
        "label": {
            "nb": "Serveringsvirksomhet",
            "en": "Food and beverage service activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_50",
        "uri": "http://data.computas.com/informasjonsmodell/nace/50",
        "label": {
            "nb": "Sjøfart",
            "en": "Water transport"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_50_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/50.2",
        "label": {
            "nb": "Sjøfart og kysttrafikk med gods",
            "en": "Sea and coastal freight water transport"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_50_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/50.1",
        "label": {
            "nb": "Sjøfart og kysttrafikk med passasjerer",
            "en": "Sea and coastal passenger water transport"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_02",
        "uri": "http://data.computas.com/informasjonsmodell/nace/02",
        "label": {
            "nb": "Skogbruk og tjenester tilknyttet skogbruk",
            "en": "Forestry and logging"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_02_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/02.1",
        "label": {
            "nb": "Skogskjøtsel og andre skogbruksaktiviteter",
            "en": "Silviculture and other forestry activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_25_5",
        "uri": "http://data.computas.com/informasjonsmodell/nace/25.5",
        "label": {
            "nb": "Smiing, stansing og valsing av metall, og pulvermetallurgi",
            "en": "Forging, pressing, stamping and roll-forming of metal; powder metallurgy"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_88",
        "uri": "http://data.computas.com/informasjonsmodell/nace/88",
        "label": {
            "nb": "Sosiale omsorgstjenester uten botilbud",
            "en": "Social work activities without accommodation"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_88_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/88.1",
        "label": {
            "nb": "Sosialtjenester uten botilbud for eldre og funksjonshemmede",
            "en": "Social work activities without accommodation for the elderly and disabled"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_43",
        "uri": "http://data.computas.com/informasjonsmodell/nace/43",
        "label": {
            "nb": "Spesialisert bygge- og anleggsvirksomhet",
            "en": "Specialised construction activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_74_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/74.1",
        "label": {
            "nb": "Spesialisert designvirksomhet",
            "en": "Specialised design activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_93",
        "uri": "http://data.computas.com/informasjonsmodell/nace/93",
        "label": {
            "nb": "Sports- og fritidsaktiviteter og drift av fornøyelsesetablissementer",
            "en": "Sports activities and amusement and recreation activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_93_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/93.1",
        "label": {
            "nb": "Sportsaktiviteter",
            "en": "Sports activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_24_5",
        "uri": "http://data.computas.com/informasjonsmodell/nace/24.5",
        "label": {
            "nb": "Støping av metaller",
            "en": "Casting of metals"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_86_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/86.1",
        "label": {
            "nb": "Sykehustjenester",
            "en": "Hospital activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_71_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/71.2",
        "label": {
            "nb": "Teknisk prøving og analyse",
            "en": "Technical testing and analysis"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_82_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/82.2",
        "label": {
            "nb": "Telefonvakttjenester og telefonsalg",
            "en": "Activities of call centres"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_61",
        "uri": "http://data.computas.com/informasjonsmodell/nace/61",
        "label": {
            "nb": "Telekommunikasjon",
            "en": "Telecommunications"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_61_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/61.9",
        "label": {
            "nb": "Telekommunikasjon ellers",
            "en": "Other telecommunications activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_09_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/09.9",
        "label": {
            "nb": "Tjenester tilknyttet annen bergverksdrift",
            "en": "Other mining and quarrying n.e.c."
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_09",
        "uri": "http://data.computas.com/informasjonsmodell/nace/09",
        "label": {
            "nb": "Tjenester tilknyttet bergverksdrift og utvinning",
            "en": "Mining support service activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_81",
        "uri": "http://data.computas.com/informasjonsmodell/nace/81",
        "label": {
            "nb": "Tjenester tilknyttet eiendomsdrift",
            "en": "Services to buildings and landscape activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_66",
        "uri": "http://data.computas.com/informasjonsmodell/nace/66",
        "label": {
            "nb": "Tjenester tilknyttet finansierings- og forsikringsvirksomhet",
            "en": "Activities auxiliary to financial services and insurance activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_66_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/66.1",
        "label": {
            "nb": "Tjenester tilknyttet finansieringsvirksomhet",
            "en": "Activities auxiliary to financial services, except insurance and pension funding"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_66_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/66.2",
        "label": {
            "nb": "Tjenester tilknyttet forsikringsvirksomhet og pensjonskasser",
            "en": "Activities auxiliary to insurance and pension funding"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_62",
        "uri": "http://data.computas.com/informasjonsmodell/nace/62",
        "label": {
            "nb": "Tjenester tilknyttet informasjonsteknologi",
            "en": "Computer programming, consultancy and related activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_62_0",
        "uri": "http://data.computas.com/informasjonsmodell/nace/62.0",
        "label": {
            "nb": "Tjenester tilknyttet informasjonsteknologi",
            "en": "Computer programming, consultancy and related activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_01_6",
        "uri": "http://data.computas.com/informasjonsmodell/nace/01.6",
        "label": {
            "nb": "Tjenester tilknyttet jordbruk og etterbehandling av vekster etter innhøsting",
            "en": "Support activities to agriculture and post-harvest crop activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_02_4",
        "uri": "http://data.computas.com/informasjonsmodell/nace/02.4",
        "label": {
            "nb": "Tjenester tilknyttet skogbruk",
            "en": "Support services to forestry"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_85_6",
        "uri": "http://data.computas.com/informasjonsmodell/nace/85.6",
        "label": {
            "nb": "Tjenester tilknyttet undervisning",
            "en": "Educational support activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_09_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/09.1",
        "label": {
            "nb": "Tjenester tilknyttet utvinning av råolje og naturgass",
            "en": "Support activities for petroleum and natural gas extraction"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_80_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/80.2",
        "label": {
            "nb": "Tjenester tilknyttet vakttjenester",
            "en": "Security systems service activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_47_8",
        "uri": "http://data.computas.com/informasjonsmodell/nace/47.8",
        "label": {
            "nb": "Torghandel",
            "en": "Retail sale via stalls and markets"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_H",
        "uri": "http://data.computas.com/informasjonsmodell/nace/H",
        "label": {
            "nb": "Transport og lagring",
            "en": "Transporting and storage"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_84_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/84.3",
        "label": {
            "nb": "Trygdeordninger underlagt offentlig forvaltning",
            "en": "Compulsory social security activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_18",
        "uri": "http://data.computas.com/informasjonsmodell/nace/18",
        "label": {
            "nb": "Trykking og reproduksjon av innspilte opptak",
            "en": "Printing and reproduction of recorded media"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_18_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/18.1",
        "label": {
            "nb": "Trykking og tjenester tilknyttet trykking",
            "en": "Printing and service activities related to printing"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_61_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/61.2",
        "label": {
            "nb": "Trådløs telekommunikasjon",
            "en": "Wireless telecommunications activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_P",
        "uri": "http://data.computas.com/informasjonsmodell/nace/P",
        "label": {
            "nb": "Undervisning",
            "en": "Education"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_85",
        "uri": "http://data.computas.com/informasjonsmodell/nace/85",
        "label": {
            "nb": "Undervisning",
            "en": "Education"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_85_4",
        "uri": "http://data.computas.com/informasjonsmodell/nace/85.4",
        "label": {
            "nb": "Undervisning i høyere utdanning",
            "en": "Higher education"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_85_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/85.3",
        "label": {
            "nb": "Undervisning på videregående skoles nivå",
            "en": "Secondary education"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_46_9",
        "uri": "http://data.computas.com/informasjonsmodell/nace/46.9",
        "label": {
            "nb": "Uspesifisert engroshandel",
            "en": "Non-specialised wholesale trade"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_58_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/58.1",
        "label": {
            "nb": "Utgivelse av bøker, tidsskrifter og annen forlagsvirksomhet",
            "en": "Publishing of books, periodicals and other publishing activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_58_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/58.2",
        "label": {
            "nb": "Utgivelse av programvare",
            "en": "Software publishing"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_78_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/78.2",
        "label": {
            "nb": "Utleie av arbeidskraft",
            "en": "Temporary employment agency activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_68_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/68.2",
        "label": {
            "nb": "Utleie av egen eller leid fast eiendom",
            "en": "Renting and operating of own or leased real estate"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_77_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/77.3",
        "label": {
            "nb": "Utleie og leasing av andre maskiner, og annet utstyr og materiell",
            "en": "Renting and leasing of other machinery, equipment and tangible goods"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_77_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/77.2",
        "label": {
            "nb": "Utleie og leasing av husholdningsvarer og varer til personlig bruk",
            "en": "Renting and leasing of personal and household goods"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_77_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/77.1",
        "label": {
            "nb": "Utleie og leasing av motorvogner",
            "en": "Renting and leasing of motor vehicles"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_77",
        "uri": "http://data.computas.com/informasjonsmodell/nace/77",
        "label": {
            "nb": "Utleie- og leasingvirksomhet",
            "en": "Rental and leasing activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_36",
        "uri": "http://data.computas.com/informasjonsmodell/nace/36",
        "label": {
            "nb": "Uttak fra kilde, rensing og distribusjon av vann",
            "en": "Water collection, treatment and supply"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_36_0",
        "uri": "http://data.computas.com/informasjonsmodell/nace/36.0",
        "label": {
            "nb": "Uttak fra kilde, rensing og distribusjon av vann",
            "en": "Water collection, treatment and supply"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_41_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/41.1",
        "label": {
            "nb": "Utvikling av byggeprosjekter",
            "en": "Development of building projects"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_06_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/06.2",
        "label": {
            "nb": "Utvinning av naturgass",
            "en": "Extraction of natural gas"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_06_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/06.1",
        "label": {
            "nb": "Utvinning av råolje",
            "en": "Extraction of crude petroleum"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_06",
        "uri": "http://data.computas.com/informasjonsmodell/nace/06",
        "label": {
            "nb": "Utvinning av råolje og naturgass",
            "en": "Extraction of crude petroleum and natural gas"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_80",
        "uri": "http://data.computas.com/informasjonsmodell/nace/80",
        "label": {
            "nb": "Vakttjeneste og etterforsking",
            "en": "Security and investigation activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_E",
        "uri": "http://data.computas.com/informasjonsmodell/nace/E",
        "label": {
            "nb": "Vannforsyning, avløps- og renovasjonsvirksomhet",
            "en": "Water supply; sewerage; waste managment and remediation activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_G",
        "uri": "http://data.computas.com/informasjonsmodell/nace/G",
        "label": {
            "nb": "Varehandel, reparasjon av motorvogner",
            "en": "Wholesale and retail trade; repair of motor vehicles and motorcycles"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_45_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/45.2",
        "label": {
            "nb": "Vedlikehold og reparasjon av motorvogner, unntatt motorsykler",
            "en": "Maintenance and repair of motor vehicles"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_64_3",
        "uri": "http://data.computas.com/informasjonsmodell/nace/64.3",
        "label": {
            "nb": "Verdipapirfond, investeringsselskaper o.l.",
            "en": "Trusts, funds and similar financial entities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_75",
        "uri": "http://data.computas.com/informasjonsmodell/nace/75",
        "label": {
            "nb": "Veterinærtjenester",
            "en": "Veterinary activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_75_0",
        "uri": "http://data.computas.com/informasjonsmodell/nace/75.0",
        "label": {
            "nb": "Veterinærtjenester",
            "en": "Veterinary activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_13_2",
        "uri": "http://data.computas.com/informasjonsmodell/nace/13.2",
        "label": {
            "nb": "Veving av tekstiler",
            "en": "Weaving of textiles"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }, {
        "id": "nace_59_1",
        "uri": "http://data.computas.com/informasjonsmodell/nace/59.1",
        "label": {
            "nb": "Virksomhet innen film, video og fjernsynsprogrammer",
            "en": "Motion picture, video and television programme activities"
        },
        "display": "nace_tittel",
        "forward": true,
        "primary": false
    }   
];


/*
 jsonSemicolonObjectProperties contains all the object properties employed in the Semicolon dataset.
 Every object property has:
 1) an id
 2) a URI
 3) a label
 */
var jsonObjectProperties = [
    {
        "id": "lok_poststed",
        "uri": "http://data.computas.com/informasjonsmodell/lokasjon/poststed",
        "label": {"en": "place", "nb": "poststed"}
    }, {
        "id": "org_agent",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/agent",
        "label": {"en": "agent", "nb": "agent"}
    }, {
        "id": "org_antAnsattePaDato",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/antAnsattePåDato",
        "label": {"en": "number of employees", "nb": "antall ansatte på dato"}
    }, {
        "id": "org_enhet",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/enhet",
        "label": {"en": "unit", "nb": "enhet"}
    }, {
        "id": "org_forretningsadresse",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/forretningsadresse",
        "label": {"en": "business address", "nb": "forretningsadresse"}
    }, {
        "id": "org_hovedenhet",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/hovedenhet",
        "label": {"en": "mother unit", "nb": "hovedenhet"}
    }, {
        "id": "org_kommune",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/kommune",
        "label": {"en": "municipality", "nb": "kommune"}
    }, {
        "id": "org_nacekode",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/nacekode",
        "label": {"en": "sector", "nb": "NACE-kode"}
    }, {
        "id": "org_organisasjonsform",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/organisasjonsform",
        "label": {"en": "organizational form", "nb": "organisasjonsform"}
    }, {
        "id": "org_postadresse",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/postadresse",
        "label": {"en": "postal address", "nb": "postadresse"}
    }, {
        "id": "org_rolle",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/rolle",
        "label": {"en": "role", "nb": "rolle"}
    }, {
        "id": "org_rolletype",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/rolletype",
        "label": {"en": "role type", "nb": "rolletype"}
    }, {
        "id": "org_underenhet",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/underenhet",
        "label": {"en": "subunit", "nb": "underenhet"}
    }, {
        "id": "org_verv",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/verv",
        "label": {"en": "position", "nb": "verv"}
    }, {
        "id": "reg_enhet",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/enhet",
        "label": {"en": "unit", "nb": "enhet"}
    }, {
        "id": "reg_regnskap",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/regnskap",
        "label": {"en": "accounting", "nb": "regnskap"}
    }
];


/*
 jsonSemicolonOutgoingLinks contains the possible outgoing links for each type in Semicolon.
 Every type has a "typeId" and a list of "outgoingLinks".
 Each outgoing link has:
 1) the property id
 2) the target concept id
 */
var jsonOutgoingLinks = [
    {
        "typeId": "org_Enhet",
        "outgoingLinks": [
            {
                "propId": "org_nacekode",
                "target": "nac_Nacekode"
            }, {
                "propId": "org_organisasjonsform",
                "target": "org_Enhetskode"
            }, {
                "propId": "org_antAnsattePaDato",
                "target": "org_AntAnsattePaDato"
            }, {
                "propId": "org_kommune",
                "target": "lok_Kommune"
            }, {
                "propId": "org_forretningsadresse",
                "target": "lok_Adresse"
            }, {
                "propId": "org_postadresse",
                "target": "lok_Adresse"
            }, {
                "propId": "reg_regnskap",
                "target": "reg_Regnskap"
            }, {
                "propId": "org_rolle",
                "target": "org_Rolle"
            }, {
                "propId": "org_verv",
                "target": "org_Rolle"
            }, {
                "propId": "org_hovedenhet",
                "target": "org_Enhet"
            }, {
                "propId": "org_underenhet",
                "target": "org_Enhet"
            }
        ]
    }, {
        "typeId": "nac_Nacekode",
        "outgoingLinks": []
    }, {
        "typeId": "org_Enhetskode",
        "outgoingLinks": []
    }, {
        "typeId": "org_AntAnsattePaDato",
        "outgoingLinks": []
    }, {
        "typeId": "reg_Regnskap",
        "outgoingLinks": [
            {
                "propId": "reg_enhet",
                "target": "org_Enhet"
            }
        ]
    }, {
        "typeId": "lok_Kommune",
        "outgoingLinks": []
    }, {
        "typeId": "lok_Adresse",
        "outgoingLinks": [
            {
                "propId": "lok_poststed",
                "target": "lok_Poststed"
            }
        ]
    }, {
        "typeId": "lok_Poststed",
        "outgoingLinks": []
    }, {
        "typeId": "org_Rolle",
        "outgoingLinks": [
            {
                "propId": "org_agent",
                "target": "org_Enhet"
            }, {
                "propId": "org_enhet",
                "target": "org_Enhet"
            }, {
                "propId": "org_rolletype",
                "target": "org_Rolletype"
            }, {
                "propId": "org_agent",
                "target": "org_Person"
            }
        ]
    }, {
        "typeId": "org_Rolletype",
        "outgoingLinks": []
    }, {
        "typeId": "org_Person",
        "outgoingLinks": [
            {
                "propId": "org_verv",
                "target": "org_Rolle"
            }
        ]
    }
];


/*jsonSemicolonIncomingLinks contains the possible incoming links for each type in Semicolon.
 Every type has a "typeId" and a list of "incomingLinks".
 Each incoming link has:
 1) the property id
 2) the source concept id
 */
var jsonIncomingLinks = [
    {
        "typeId": "org_Enhet",
        "incomingLinks": [
            {
                "propId": "reg_enhet",
                "source": "reg_Regnskap"
            }, {
                "propId": "org_agent",
                "source": "org_Rolle"
            }, {
                "propId": "org_enhet",
                "source": "org_Rolle"
            }, {
                "propId": "org_hovedenhet",
                "source": "org_Enhet"
            }, {
                "propId": "org_underenhet",
                "source": "org_Enhet"
            }
        ]
    }, {
        "typeId": "nac_Nacekode",
        "incomingLinks": [
            {
                "propId": "org_nacekode",
                "source": "org_Enhet"
            }
        ]
    }, {
        "typeId": "org_Enhetskode",
        "incomingLinks": [
            {
                "propId": "org_organisasjonsform",
                "source": "org_Enhet"
            }
        ]
    }, {
        "typeId": "org_AntAnsattePaDato",
        "incomingLinks": [
            {
                "propId": "org_antAnsattePaDato",
                "source": "org_Enhet"
            }
        ]
    }, {
        "typeId": "reg_Regnskap",
        "incomingLinks": [
            {
                "propId": "reg_regnskap",
                "source": "org_Enhet"
            }
        ]
    }, {
        "typeId": "lok_Kommune",
        "incomingLinks": [
            {
                "propId": "org_kommune",
                "source": "org_Enhet"
            }
        ]
    }, {
        "typeId": "lok_Adresse",
        "incomingLinks": [
            {
                "propId": "org_forretningsadresse",
                "source": "org_Enhet"
            }, {
                "propId": "org_postadresse",
                "source": "org_Enhet"
            }
        ]
    }, {
        "typeId": "lok_Poststed",
        "incomingLinks": [
            {
                "propId": "lok_poststed",
                "source": "lok_Adresse"
            }
        ]
    }, {
        "typeId": "org_Rolle",
        "incomingLinks": [
            {
                "propId": "org_rolle",
                "source": "org_Enhet"
            }, {
                "propId": "org_verv",
                "source": "org_Enhet"
            }, {
                "propId": "org_verv",
                "source": "org_Person"
            }
        ]
    }, {
        "typeId": "org_Rolletype",
        "incomingLinks": [
            {
                "propId": "org_rolletype",
                "source": "org_Rolle"
            }
        ]
    }, {
        "typeId": "org_Person",
        "incomingLinks": [
            {
                "propId": "org_agent",
                "source": "org_Rolle"
            }
        ]
    }
];


/*
 jsonSemicolonDatatypeProperties contains all the datatype properties employed in the Semicolon dataset.
 Every datatype property has:
 1) an id
 2) a URI
 3) a label
 */
var jsonDatatypeProperties = [
    {
        "id": "org_hjemmeside",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/hjemmeside",
        "label": {"en": "website", "nb": "hjemmeside"}
    }, {
        "id": "org_telefonnummer",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/telefonnummer",
        "label": {"en": "telephone number", "nb": "telefonnummer"}
    }, {
        "id": "org_historiskNavn",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/historiskNavn",
        "label": {"en": "historical name", "nb": "historisk navn"}
    }, {
        "id": "org_epost",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/epost",
        "label": {"en": "email", "nb": "epost"}
    }, {
        "id": "org_navn",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/navn",
        "label": {"en": "name", "nb": "navn"}
    }, {
        "id": "org_organisasjonsnummer",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/organisasjonsnummer",
        "label": {"en": "organization number", "nb": "organisasjonsnummer"}
    }, {
        "id": "org_registreringsdato",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/registreringsdato",
        "label": {"en": "date of registration", "nb": "registreringsdato"}
    }, {
        "id": "org_stiftelsesdato",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/stiftelsesdato",
        "label": {"en": "date of founding", "nb": "stiftelsesdato"}
    }, {
        "id": "lok_adressebeskrivelse",
        "uri": "http://data.computas.com/informasjonsmodell/lokasjon/adressebeskrivelse",
        "label": {"en": "address", "nb": "adressebeskrivelse"}
    }, {
        "id": "lok_utenlandsPoststed",
        "uri": "http://data.computas.com/informasjonsmodell/lokasjon/utenlandsPoststed",
        "label": {"en": "foreign postal address", "nb": "utenlands poststed"}
    }, {
        "id": "lok_pnavn",
        "uri": "http://data.computas.com/informasjonsmodell/lokasjon/pnavn",
        "label": {"en": "place name", "nb": "navn på poststed"}
    }, {
        "id": "lok_postnummer",
        "uri": "http://data.computas.com/informasjonsmodell/lokasjon/postnummer",
        "label": {"en": "zip code", "nb": "postnummer"}
    }, {
        "id": "lok_pland",
        "uri": "http://data.computas.com/informasjonsmodell/lokasjon/pland",
        "label": {"en": "country", "nb": "land"}
    }, {
        "id": "org_fodselsdato",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/fødselsdato",
        "label": {"en": "date of birth", "nb": "fødselsdato"}
    }, {
        "id": "org_kjonn",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/kjønn",
        "label": {"en": "sex", "nb": "kjønn"}
    }, {
        "id": "nace_inkluderer_ogsa",
        "uri": "http://data.computas.com/informasjonsmodell/nace/inkluderer_også",
        "label": {"en": "also includes", "nb": "inkluderer også"}
    }, {
        "id": "nace_beskrivelse",
        "uri": "http://data.computas.com/informasjonsmodell/nace/beskrivelse",
        "label": {"en": "description", "nb": "beskrivelse"}
    }, {
        "id": "nace_ekskluderer",
        "uri": "http://data.computas.com/informasjonsmodell/nace/ekskluderer",
        "label": {"en": "excludes", "nb": "ekskluderer"}
    }, {
        "id": "nace_inkluderer",
        "uri": "http://data.computas.com/informasjonsmodell/nace/inkluderer",
        "label": {"en": "includes", "nb": "inkluderer"}
    }, {
        "id": "nace_niva",
        "uri": "http://data.computas.com/informasjonsmodell/nace/nivå",
        "label": {"en": "level", "nb": "nivå"}
    }, {
        "id": "nace_tittel",
        "uri": "http://data.computas.com/informasjonsmodell/nace/tittel",
        "label": {"en": "title", "nb": "tittel"}
    }, {
        "id": "nace_tittel_kort",
        "uri": "http://data.computas.com/informasjonsmodell/nace/tittel_kort",
        "label": {"en": "short title", "nb": "kort tittel"}
    }, {
        "id": "nace_tittel_med",
        "uri": "http://data.computas.com/informasjonsmodell/nace/tittel_med",
        "label": {"en": "medium title", "nb": "medium tittel"}
    }, {
        "id": "lok_kommunenummer",
        "uri": "http://data.computas.com/informasjonsmodell/lokasjon/kommunenummer",
        "label": {"en": "municipality number", "nb": "kommunenummer"}
    }, {
        "id": "lok_navn",
        "uri": "http://data.computas.com/informasjonsmodell/lokasjon/navn",
        "label": {"en": "name", "nb": "navn"}
    }, {
        "id": "org_beskrivelse",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/beskrivelse",
        "label": {"en": "description", "nb": "beskrivelse"}
    }, {
        "id": "org_kode",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/kode",
        "label": {"en": "code", "nb": "kode"}
    }, {
        "id": "org_antAnsatte",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/antAnsatte",
        "label": {"en": "number of employees", "nb": "antall ansatte"}
    }, {
        "id": "org_gyldigFraDato",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/gyldigFraDato",
        "label": {"en": "effective date", "nb": "gyldig fra dato"}
    }, {
        "id": "reg_sumVarer",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/sumVarer",
        "label": {"en": "sum of items", "nb": "sum varer"}
    }, {
        "id": "reg_sumImmaterielleEiendeler",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/sumImmaterielleEiendeler",
        "label": {"en": "sum of intellectual property", "nb": "sum immaterielle eiendeler"}
    }, {
        "id": "reg_sumFinansielleAnleggsmidler",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/sumFinansielleAnleggsmidler",
        "label": {"en": "sum of financial assets", "nb": "sum finansielle anleggsmidler"}
    }, {
        "id": "reg_sumEgenkapitalOgGjeld",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/sumEgenkapitalOgGjeld",
        "label": {"en": "sum of equity and debt", "nb": "sum egenkapital og gjeld"}
    }, {
        "id": "reg_sumEiendeler",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/sumEiendeler",
        "label": {"en": "sum of assets", "nb": "sum eiendeler"}
    }, {
        "id": "reg_sumFordringer",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/sumFordringer",
        "label": {"en": "sum of receivables", "nb": "sum fordringer"}
    }, {
        "id": "reg_sumGjeld",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/sumGjeld",
        "label": {"en": "sum of debt", "nb": "sum gjeld"}
    }, {
        "id": "reg_sumInnskuttEgenkapital",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/sumInnskuttEgenkapital",
        "label": {"en": "sum of contributed equity", "nb": "sum innskutt egenkapital"}
    }, {
        "id": "reg_sumKortsiktigGjeld",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/sumKortsiktigGjeld",
        "label": {"en": "sum of short-term debt", "nb": "sum kortsiktig gjeld"}
    }, {
        "id": "reg_sumKostnader",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/sumKostnader",
        "label": {"en": "sum of costs", "nb": "sum kostnader"}
    }, {
        "id": "reg_sumOmlopsmidler",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/sumOmløpsmidler",
        "label": {"en": "sum of current assets", "nb": "sum omløpsmidler"}
    }, {
        "id": "reg_sumOpptjentEgenkapital",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/sumOpptjentEgenkapital",
        "label": {"en": "sum of earned equity", "nb": "sum opptjent egenkapital"}
    }, {
        "id": "reg_valuta",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/valuta",
        "label": {"en": "currency", "nb": "valuta"}
    }, {
        "id": "reg_ar",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/år",
        "label": {"en": "year", "nb": "år"}
    }, {
        "id": "reg_arsresultat",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/årsresultat",
        "label": {"en": "net income", "nb": "årsresultat"}
    }, {
        "id": "reg_sumBankinnskuddKontanterOgLignende",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/sumBankinnskuddKontanterOgLignende",
        "label": {"en": "sum of bank deposits etc.", "nb": "sum bankinnskudd kontanter og lignende"}
    }, {
        "id": "reg_sumFinansinntekter",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/sumFinansinntekter",
        "label": {"en": "sum of financial income", "nb": "sum finansinntekter"}
    }, {
        "id": "reg_sumFinanskostnader",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/sumFinanskostnader",
        "label": {"en": "sum of financial costs", "nb": "sum finanskostnader"}
    }, {
        "id": "reg_sumInntekter",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/sumInntekter",
        "label": {"en": "sum of income", "nb": "sum inntekter"}
    }, {
        "id": "reg_sumLangsiktigGjeld",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/sumLangsiktigGjeld",
        "label": {"en": "sum of long-term debt", "nb": "sum langsiktig gjeld"}
    }, {
        "id": "reg_sumVarigeDriftsmidler",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/sumVarigeDriftsmidler",
        "label": {"en": "sum of fixed assets", "nb": "sum varige driftsmidler"}
    }, {
        "id": "reg_driftsresultat",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/driftsresultat",
        "label": {"en": "sum of earnings", "nb": "driftsresultat"}
    }, {
        "id": "reg_mottakstype",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/mottakstype",
        "label": {"en": "reception type", "nb": "mottakstype"}
    }, {
        "id": "reg_ordinartResultatEtterSkattekostnad",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/ordinærtResultatEtterSkattekostnad",
        "label": {"en": "profit after tax", "nb": "ordinært resultat etter skattekostnad"}
    }, {
        "id": "reg_ordinartResultatForSkattekostnad",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/ordinærtResultatFørSkattekostnad",
        "label": {"en": "profit before tax", "nb": "ordinært resultat før skattekostnad"}
    }, {
        "id": "reg_sumAnleggsmidler",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/sumAnleggsmidler",
        "label": {"en": "sum of assets", "nb": "sum anleggsmidler"}
    }, {
        "id": "reg_sumEgenkapital",
        "uri": "http://data.computas.com/informasjonsmodell/regnskapsregisteret/sumEgenkapital",
        "label": {"en": "sum of equity", "nb": "sum egenkapital"}
    }, {
        "id": "org_dato",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/dato",
        "label": {"en": "date", "nb": "dato"}
    }, {
        "id": "rdf_label",
        "uri": "http://www.w3.org/2000/01/rdf-schema#label",
        "label": {"en": "label", "nb": "etikett"}
    }, {
        "id": "org_rolletypekode",
        "uri": "http://data.computas.com/informasjonsmodell/organisasjon/rolletypekode",
        "label": {"en": "role type code", "nb": "rolletypekode"}
    }
];


/*
 jsonSemicolonLiteralValues contains the possible literal values for each type in Semicolon.
 Every type has a "typeId" and a list of "literalValues".
 Each literal value has:
 1) the property id
 2) the data type
 */
var jsonLiteralValues = [
    {
        "typeId": "org_Enhet",
        "literalValues": [
            {
                "propId": "org_navn",
                "dataType": "string",
                "searchable": true,
                "uiType": "string"
            }, {
                "propId": "rdf_label",
                "dataType": "string",
                "searchable": false,
                "uiType": "string"
            }, {
                "propId": "org_historiskNavn",
                "dataType": "string",
                "searchable": false,
                "uiType": "string"
            }, {
                "propId": "org_organisasjonsnummer",
                "dataType": "integer",
                "min": 810006862,
                "max": 998046394,
                "searchable": true,
                "uiType": "string"
            }, {
                "propId": "org_stiftelsesdato",
                "dataType": "date",
                "transform": "YEAR",
                "min": 1753,
                "max": 2012,
                "searchable": true,
                "uiType": "range"
            }, {
                "propId": "org_telefonnummer",
                "dataType": "string",
                "searchable": false,
                "uiType": "string"
            }, {
                "propId": "org_hjemmeside",
                "dataType": "string",
                "searchable": false,
                "uiType": "string"
            }, {
                "propId": "org_epost",
                "dataType": "string",
                "searchable": false,
                "uiType": "string"
            }, {
                "propId": "org_registreringsdato",
                "dataType": "date",
                "transform": "YEAR",
                "min": 1988,
                "max": 2012,
                "searchable": false,
                "uiType": "range"
            }
        ]
    }, {
        "typeId": "nac_Nacekode",
        "literalValues": [
            {
                "propId": "nace_tittel",
                "dataType": "string",
                "searchable": true,
                "uiType": "string"
            }, {
                "propId": "nace_tittel_kort",
                "dataType": "string",
                "searchable": false,
                "uiType": "string"
            }, {
                "propId": "nace_tittel_med",
                "dataType": "string",
                "searchable": false,
                "uiType": "string"
            }, {
                "propId": "rdf_label",
                "dataType": "string",
                "searchable": true,
                "uiType": "string"
            }, {
                "propId": "nace_niva",
                "dataType": "integer",
                "min": 1,
                "max": 5,
                "searchable": false,
                "uiType": "string"
            }, {
                "propId": "nace_beskrivelse",
                "dataType": "string",
                "searchable": false,
                "uiType": "string"
            }, {
                "propId": "nace_inkluderer",
                "dataType": "string",
                "searchable": false,
                "uiType": "string"
            }, {
                "propId": "nace_inkluderer_ogsa",
                "dataType": "string",
                "searchable": false,
                "uiType": "string"
            }, {
                "propId": "nace_ekskluderer",
                "dataType": "string",
                "searchable": false,
                "uiType": "string"
            }
        ]
    }, {
        "typeId": "org_Enhetskode",
        "literalValues": [
            {
                "propId": "rdf_label",
                "dataType": "string",
                "searchable": true,
                "uiType": "string"
            }, {
                "propId": "org_kode",
                "dataType": "string",
                "searchable": false,
                "uiType": "string"
            }, {
                "propId": "org_beskrivelse",
                "dataType": "string",
                "searchable": false,
                "uiType": "string"
            }
        ]
    }, {
        "typeId": "org_AntAnsattePaDato",
        "literalValues": [
            {
                "propId": "org_antAnsatte",
                "dataType": "integer",
                "min": 0,
                "max": 18765,
                "searchable": true,
                "uiType": "range"
            }, {
                "propId": "org_gyldigFraDato",
                "dataType": "date",
                "transform": "YEAR",
                "min": 1988,
                "max": 2012,
                "searchable": false,
                "uiType": "range"
            }
        ]
    }, {
        "typeId": "reg_Regnskap",
        "literalValues": [
            {
                "propId": "reg_ar",
                "dataType": "string",
                "searchable": true,
                "values": [ "2008", "2009", "2010"],
                "uiType": "checkbox"
            }, {
                "propId": "reg_arsresultat",
                "dataType": "string",
                "transform": "xsd:decimal",  
                "min": -103049893000,
                "max": 127285000000,
                "searchable": true,
                "uiType": "range"
            }, {
                "propId": "reg_driftsresultat",
                "dataType": "string",
                "transform": "xsd:decimal",
                "min": -88392522000,
                "max": 193745000000,
                "searchable": false,
                "uiType": "range"
            }, {
                "propId": "reg_mottakstype",
                "dataType": "string",
                "searchable": false,
                "uiType": "string"
            }, {
                "propId": "reg_ordinartResultatEtterSkattekostnad",
                "dataType": "string",
                "transform": "xsd:decimal",
                "min": -103049893000,
                "max": 127285000000,
                "searchable": false,
                "uiType": "range"
            }, {
                "propId": "reg_ordinartResultatForSkattekostnad",
                "dataType": "string",
                "transform": "xsd:decimal",
                "min": -103049893000,
                "max": 177130000000,
                "searchable": false,
                "uiType": "range"
            }, {
                "propId": "reg_sumBankinnskuddKontanterOgLignende",
                "dataType": "string",
                "transform": "xsd:decimal",
                "min": -1015411000,
                "max": 210446000000,
                "searchable": false,
                "uiType": "range"
            }, {
                "propId": "reg_sumEgenkapital",
                "dataType": "string",
                "transform": "xsd:decimal",
                "min": -156808466000,
                "max": 12636110000000,
                "searchable": false,
                "uiType": "range"
            }, {
                "propId": "reg_sumEgenkapitalOgGjeld",
                "dataType": "string",
                "transform": "xsd:decimal",
                "min": -1205644000,
                "max": 15643339000000,
                "searchable": false,
                "uiType": "range"
            }, {
                "propId": "reg_sumEiendeler",
                "dataType": "string",
                "transform": "xsd:decimal",
                "min": -20067645,
                "max": 15643339000000,
                "searchable": false,
                "uiType": "range"
            }, {
                "propId": "reg_sumFinansinntekter",
                "dataType": "string",
                "transform": "xsd:decimal",
                "min": -3993710000,
                "max": 81695000000,
                "searchable": false,
                "uiType": "range"
            }, {
                "propId": "reg_sumFinanskostnader",
                "dataType": "string",
                "transform": "xsd:decimal",
                "min": -9625753995,
                "max": 48131076000,
                "searchable": false,
                "uiType": "range"
            }, {
                "propId": "reg_sumFordringer",
                "dataType": "string",
                "transform": "xsd:decimal",
                "min": -55502000,
                "max": 4307511000000,
                "searchable": false,
                "uiType": "range"
            }, {
                "propId": "reg_sumGjeld",
                "dataType": "string",
                "transform": "xsd:decimal",
                "min": -3288203819,
                "max": 3007229000000,
                "searchable": false,
                "uiType": "range"
            }, {
                "propId": "reg_sumInntekter",
                "dataType": "string",
                "transform": "xsd:decimal",
                "min": -2883588360,
                "max": 12655354000000,
                "searchable": false,
                "uiType": "range"
            }, {
                "propId": "reg_sumKortsiktigGjeld",
                "dataType": "string",
                "transform": "xsd:decimal",
                "min": -315156000,
                "max": 3007229000000,
                "searchable": false,
                "uiType": "range"
            }, {
                "propId": "reg_sumKostnader",
                "dataType": "string",
                "transform": "xsd:decimal",
                "min": -1517464249,
                "max": 12621439000000,
                "searchable": false,
                "uiType": "range"
            }, {
                "propId": "reg_sumOmlopsmidler",
                "dataType": "string",
                "transform": "xsd:decimal",
                "min": -949647000,
                "max": 4307511000000,
                "searchable": false,
                "uiType": "range"
            }, {
                "propId": "reg_sumOpptjentEgenkapital",
                "dataType": "string",
                "transform": "xsd:decimal",
                "min": -240308466000,
                "max": 10396270000000,
                "searchable": false,
                "uiType": "range"
            }, {
                "propId": "reg_sumVarer",
                "dataType": "string",
                "transform": "xsd:decimal",
                "min": -48870000,
                "max": 129421000000,
                "searchable": false,
                "uiType": "range"
            }, {
                "propId": "reg_sumImmaterielleEiendeler",
                "dataType": "string",
                "transform": "xsd:decimal",
                "min": -188558000,
                "max": 85176000000,
                "searchable": false,
                "uiType": "range"
            }, {
                "propId": "reg_sumFinansielleAnleggsmidler",
                "dataType": "string",
                "transform": "xsd:decimal",
                "min": -11070079,
                "max": 11335828000000,
                "searchable": false,
                "uiType": "range"
            }, {
                "propId": "reg_sumInnskuttEgenkapital",
                "dataType": "string",
                "transform": "xsd:decimal",
                "min": -2870428000,
                "max": 2239840000000,
                "searchable": false,
                "uiType": "range"
            }, {
                "propId": "reg_sumLangsiktigGjeld",
                "dataType": "string",
                "transform": "xsd:decimal",
                "min": -2113440000,
                "max": 721656405000,
                "searchable": false,
                "uiType": "range"
            }, {
                "propId": "reg_sumVarigeDriftsmidler",
                "dataType": "string",
                "transform": "xsd:decimal",
                "min": -988169,
                "max": 210892000000,
                "searchable": false,
                "uiType": "range"
            }, {
                "propId": "reg_sumAnleggsmidler",
                "dataType": "string",
                "transform": "xsd:decimal",
                "min": -57821000,
                "max": 11335828000000,
                "searchable": false,
                "uiType": "range"
            }, {
                "propId": "reg_valuta",
                "dataType": "string",
                "searchable": false,
                "uiType": "string"
            }
        ]
    }, {
        "typeId": "lok_Kommune",
        "literalValues": [
            {
                "propId": "lok_navn",
                "dataType": "string",
                "searchable": true,
                "uiType": "string"
            }, {
                "propId": "lok_kommunenummer",
                "dataType": "string",
                "searchable": true,
                "uiType": "string"
            }
        ]
    }, {
        "typeId": "lok_Adresse",
        "literalValues": [
            {
                "propId": "lok_adressebeskrivelse",
                "dataType": "string",
                "searchable": true,
                "uiType": "string"
            }
        ]
    }, {
        "typeId": "lok_Poststed",
        "literalValues": [
            {
                "propId": "lok_utenlandsPoststed",
                "dataType": "string",
                "searchable": false,
                "uiType": "string"
            }, {
                "propId": "lok_pnavn",
                "dataType": "string",
                "searchable": true,
                "uiType": "string"
            }, {
                "propId": "lok_postnummer",
                "dataType": "string",
                "searchable": true,
                "uiType": "string"
            }, {
                "propId": "lok_pland",
                "dataType": "string",
                "searchable": true,
                "uiType": "string"
            }
        ]
    }, {
        "typeId": "org_Rolle",
        "literalValues": [
            {
                "propId": "org_dato",
                "dataType": "date",
                "transform": "YEAR",
                "min": 1995,
                "max": 2012,
                "searchable": true,
                "uiType": "range"
            }
        ]
    }, {
        "typeId": "org_Rolletype",
        "literalValues": [
            {
                "propId": "rdf_label",
                "dataType": "string",
                "searchable": true,
                "uiType": "string"
            }, {
                "propId": "org_rolletypekode",
                "dataType": "string",
                "searchable": false,
                "uiType": "string"
            }
        ]
    }, {
        "typeId": "org_Person",
        "literalValues": [
            {
                "propId": "org_navn",
                "dataType": "string",
                "searchable": true,
                "uiType": "string"
            }, {
                "propId": "org_kjonn",
                "dataType": "string",
                "searchable": true,
                "values": [ "K", "M"],
                "uiType": "checkbox"
            }, {
                "propId": "org_fodselsdato",
                "dataType": "string",
                "searchable": false,
                "uiType": "string"
            }
        ]
    }
];


/*
 jsonSemicolonSubclassRelations encodes every subclass relation in
 the Semicolon data.
 Every type has a "typeId" and a list of subclasses.
 */
var jsonSubclassRelations = [
    {
        "typeId": "nace_70_2",
        "subclasses": []
    }, {
        "typeId": "nace_46",
        "subclasses": [
            "nace_46_1", "nace_46_5", "nace_46_6", "nace_46_4", "nace_46_2", "nace_46_3", "nace_46_7", "nace_46_9"
        ]
    }, {
        "typeId": "nace_46_1",
        "subclasses": []
    }, {
        "typeId": "nace_94_9",
        "subclasses": []
    }, {
        "typeId": "nace_94",
        "subclasses": [
            "nace_94_9", "nace_94_2", "nace_94_1"
        ]
    }, {
        "typeId": "nace_03_2",
        "subclasses": []
    }, {
        "typeId": "nace_86_9",
        "subclasses": []
    }, {
        "typeId": "nace_63_9",
        "subclasses": []
    }, {
        "typeId": "nace_87_9",
        "subclasses": []
    }, {
        "typeId": "nace_78_3",
        "subclasses": []
    }, {
        "typeId": "nace_53_2",
        "subclasses": []
    }, {
        "typeId": "nace_88_9",
        "subclasses": []
    }, {
        "typeId": "nace_52_2",
        "subclasses": []
    }, {
        "typeId": "nace_42",
        "subclasses": [
            "nace_42_9", "nace_42_2", "nace_42_1"
        ]
    }, {
        "typeId": "nace_79_9",
        "subclasses": []
    }, {
        "typeId": "nace_24_3",
        "subclasses": []
    }, {
        "typeId": "nace_08_9",
        "subclasses": []
    }, {
        "typeId": "nace_47_7",
        "subclasses": []
    }, {
        "typeId": "nace_74",
        "subclasses": [
            "nace_74_9", "nace_74_2", "nace_74_3", "nace_74_1"
        ]
    }, {
        "typeId": "nace_74_9",
        "subclasses": []
    }, {
        "typeId": "nace_64_9",
        "subclasses": []
    }, {
        "typeId": "nace_82",
        "subclasses": [
            "nace_82_9", "nace_82_3", "nace_82_1", "nace_82_2"
        ]
    }, {
        "typeId": "nace_32",
        "subclasses": [
            "nace_32_9", "nace_32_1", "nace_32_5", "nace_32_2", "nace_32_4", "nace_32_3"
        ]
    }, {
        "typeId": "nace_49_3",
        "subclasses": []
    }, {
        "typeId": "nace_55_9",
        "subclasses": []
    }, {
        "typeId": "nace_96",
        "subclasses": [
            "nace_96_0"
        ]
    }, {
        "typeId": "nace_96_0",
        "subclasses": []
    }, {
        "typeId": "nace_43_9",
        "subclasses": []
    }, {
        "typeId": "nace_S",
        "subclasses": [
            "nace_94", "nace_96", "nace_95"
        ]
    }, {
        "typeId": "nace_85_5",
        "subclasses": []
    }, {
        "typeId": "nace_73_1",
        "subclasses": []
    }, {
        "typeId": "nace_73",
        "subclasses": [
            "nace_73_1", "nace_73_2"
        ]
    }, {
        "typeId": "nace_78",
        "subclasses": [
            "nace_78_3", "nace_78_1", "nace_78_2"
        ]
    }, {
        "typeId": "nace_94_2",
        "subclasses": []
    }, {
        "typeId": "nace_71_1",
        "subclasses": []
    }, {
        "typeId": "nace_71",
        "subclasses": [
            "nace_71_1", "nace_71_2"
        ]
    }, {
        "typeId": "nace_02_2",
        "subclasses": []
    }, {
        "typeId": "nace_64_1",
        "subclasses": []
    }, {
        "typeId": "nace_10_2",
        "subclasses": []
    }, {
        "typeId": "nace_10_3",
        "subclasses": []
    }, {
        "typeId": "nace_13_1",
        "subclasses": []
    }, {
        "typeId": "nace_38_2",
        "subclasses": []
    }, {
        "typeId": "nace_81_3",
        "subclasses": []
    }, {
        "typeId": "nace_15_1",
        "subclasses": []
    }, {
        "typeId": "nace_B",
        "subclasses": [
            "nace_07", "nace_05", "nace_08", "nace_09", "nace_06"
        ]
    }, {
        "typeId": "nace_05_2",
        "subclasses": []
    }, {
        "typeId": "nace_07_2",
        "subclasses": []
    }, {
        "typeId": "nace_07_1",
        "subclasses": []
    }, {
        "typeId": "nace_07",
        "subclasses": [
            "nace_07_2", "nace_07_1"
        ]
    }, {
        "typeId": "nace_08_1",
        "subclasses": []
    }, {
        "typeId": "nace_05_1",
        "subclasses": []
    }, {
        "typeId": "nace_05",
        "subclasses": [
            "nace_05_2", "nace_05_1"
        ]
    }, {
        "typeId": "nace_08",
        "subclasses": [
            "nace_08_9", "nace_08_1"
        ]
    }, {
        "typeId": "nace_47_4",
        "subclasses": []
    }, {
        "typeId": "nace_47_5",
        "subclasses": []
    }, {
        "typeId": "nace_47_1",
        "subclasses": []
    }, {
        "typeId": "nace_47_6",
        "subclasses": []
    }, {
        "typeId": "nace_47_2",
        "subclasses": []
    }, {
        "typeId": "nace_F",
        "subclasses": [
            "nace_42", "nace_41", "nace_43"
        ]
    }, {
        "typeId": "nace_42_9",
        "subclasses": []
    }, {
        "typeId": "nace_30_1",
        "subclasses": []
    }, {
        "typeId": "nace_42_2",
        "subclasses": []
    }, {
        "typeId": "nace_42_1",
        "subclasses": []
    }, {
        "typeId": "nace_56_2",
        "subclasses": []
    }, {
        "typeId": "nace_35_3",
        "subclasses": []
    }, {
        "typeId": "nace_63_1",
        "subclasses": []
    }, {
        "typeId": "nace_47_3",
        "subclasses": []
    }, {
        "typeId": "nace_47_9",
        "subclasses": []
    }, {
        "typeId": "nace_47",
        "subclasses": [
            "nace_47_7", "nace_47_4", "nace_47_5", "nace_47_1", "nace_47_6", "nace_47_2", "nace_47_3", "nace_47_9", "nace_47_8"
        ]
    }, {
        "typeId": "nace_56_3",
        "subclasses": []
    }, {
        "typeId": "nace_91",
        "subclasses": [
            "nace_91_0"
        ]
    }, {
        "typeId": "nace_91_0",
        "subclasses": []
    }, {
        "typeId": "nace_55_3",
        "subclasses": []
    }, {
        "typeId": "nace_55_2",
        "subclasses": []
    }, {
        "typeId": "nace_01_1",
        "subclasses": []
    }, {
        "typeId": "nace_01_2",
        "subclasses": []
    }, {
        "typeId": "nace_D",
        "subclasses": [
            "nace_35"
        ]
    }, {
        "typeId": "nace_35",
        "subclasses": [
            "nace_35_3", "nace_35_2", "nace_35_1"
        ]
    }, {
        "typeId": "nace_43_2",
        "subclasses": []
    }, {
        "typeId": "nace_46_5",
        "subclasses": []
    }, {
        "typeId": "nace_46_6",
        "subclasses": []
    }, {
        "typeId": "nace_46_4",
        "subclasses": []
    }, {
        "typeId": "nace_46_2",
        "subclasses": []
    }, {
        "typeId": "nace_46_3",
        "subclasses": []
    }, {
        "typeId": "nace_46_7",
        "subclasses": []
    }, {
        "typeId": "nace_13_3",
        "subclasses": []
    }, {
        "typeId": "nace_80_3",
        "subclasses": []
    }, {
        "typeId": "nace_M",
        "subclasses": [
            "nace_74", "nace_73", "nace_71", "nace_72", "nace_70", "nace_69", "nace_75"
        ]
    }, {
        "typeId": "nace_43_3",
        "subclasses": []
    }, {
        "typeId": "nace_59",
        "subclasses": [
            "nace_59_2", "nace_59_1"
        ]
    }, {
        "typeId": "nace_K",
        "subclasses": [
            "nace_64", "nace_65", "nace_66"
        ]
    }, {
        "typeId": "nace_64",
        "subclasses": [
            "nace_64_9", "nace_64_1", "nace_64_2", "nace_64_3"
        ]
    }, {
        "typeId": "nace_03_1",
        "subclasses": []
    }, {
        "typeId": "nace_03",
        "subclasses": [
            "nace_03_2", "nace_03_1"
        ]
    }, {
        "typeId": "nace_60_2",
        "subclasses": []
    }, {
        "typeId": "nace_66_3",
        "subclasses": []
    }, {
        "typeId": "nace_58",
        "subclasses": [
            "nace_58_1", "nace_58_2"
        ]
    }, {
        "typeId": "nace_N",
        "subclasses": [
            "nace_82", "nace_78", "nace_79", "nace_81", "nace_77", "nace_80"
        ]
    }, {
        "typeId": "nace_82_9",
        "subclasses": []
    }, {
        "typeId": "nace_65_1",
        "subclasses": []
    }, {
        "typeId": "nace_65",
        "subclasses": [
            "nace_65_1", "nace_65_2", "nace_65_3"
        ]
    }, {
        "typeId": "nace_72",
        "subclasses": [
            "nace_72_1", "nace_72_2"
        ]
    }, {
        "typeId": "nace_72_1",
        "subclasses": []
    }, {
        "typeId": "nace_72_2",
        "subclasses": []
    }, {
        "typeId": "nace_74_2",
        "subclasses": []
    }, {
        "typeId": "nace_93_2",
        "subclasses": []
    }, {
        "typeId": "nace_85_1",
        "subclasses": []
    }, {
        "typeId": "nace_65_2",
        "subclasses": []
    }, {
        "typeId": "nace_49_2",
        "subclasses": []
    }, {
        "typeId": "nace_50_4",
        "subclasses": []
    }, {
        "typeId": "nace_49_4",
        "subclasses": []
    }, {
        "typeId": "nace_85_2",
        "subclasses": []
    }, {
        "typeId": "nace_45_3",
        "subclasses": []
    }, {
        "typeId": "nace_45_4",
        "subclasses": []
    }, {
        "typeId": "nace_45_1",
        "subclasses": []
    }, {
        "typeId": "nace_45",
        "subclasses": [
            "nace_45_3", "nace_45_4", "nace_45_1", "nace_45_2"
        ]
    }, {
        "typeId": "nace_Q",
        "subclasses": [
            "nace_86", "nace_87", "nace_88"
        ]
    }, {
        "typeId": "nace_86",
        "subclasses": [
            "nace_86_9", "nace_86_2", "nace_86_1"
        ]
    }, {
        "typeId": "nace_23_7",
        "subclasses": []
    }, {
        "typeId": "nace_64_2",
        "subclasses": []
    }, {
        "typeId": "nace_55_1",
        "subclasses": []
    }, {
        "typeId": "nace_70_1",
        "subclasses": []
    }, {
        "typeId": "nace_70",
        "subclasses": [
            "nace_70_2", "nace_70_1"
        ]
    }, {
        "typeId": "nace_01_4",
        "subclasses": []
    }, {
        "typeId": "nace_C",
        "subclasses": [
            "nace_32", "nace_23", "nace_30", "nace_26", "nace_11", "nace_27", "nace_21", "nace_22", "nace_20", "nace_14", "nace_19", "nace_15", "nace_28", "nace_24", "nace_25", "nace_29", "nace_31", "nace_10", "nace_17", "nace_13", "nace_12", "nace_16", "nace_33", "nace_18"
        ]
    }, {
        "typeId": "nace_32_9",
        "subclasses": []
    }, {
        "typeId": "nace_J",
        "subclasses": [
            "nace_59", "nace_58", "nace_63", "nace_60", "nace_61", "nace_62"
        ]
    }, {
        "typeId": "nace_63",
        "subclasses": [
            "nace_63_9", "nace_63_1"
        ]
    }, {
        "typeId": "nace_38_1",
        "subclasses": []
    }, {
        "typeId": "nace_02_3",
        "subclasses": []
    }, {
        "typeId": "nace_38",
        "subclasses": [
            "nace_38_2", "nace_38_1", "nace_38_3"
        ]
    }, {
        "typeId": "nace_33_2",
        "subclasses": []
    }, {
        "typeId": "nace_87_3",
        "subclasses": []
    }, {
        "typeId": "nace_87_2",
        "subclasses": []
    }, {
        "typeId": "nace_U",
        "subclasses": [
            "nace_99"
        ]
    }, {
        "typeId": "nace_99",
        "subclasses": [
            "nace_99_0"
        ]
    }, {
        "typeId": "nace_99_0",
        "subclasses": []
    }, {
        "typeId": "nace_01_7",
        "subclasses": []
    }, {
        "typeId": "nace_01",
        "subclasses": [
            "nace_01_1", "nace_01_2", "nace_01_4", "nace_01_7", "nace_01_5", "nace_01_3", "nace_01_6"
        ]
    }, {
        "typeId": "nace_A",
        "subclasses": [
            "nace_03", "nace_01", "nace_02"
        ]
    }, {
        "typeId": "nace_69",
        "subclasses": [
            "nace_69_1", "nace_69_2"
        ]
    }, {
        "typeId": "nace_69_1",
        "subclasses": []
    }, {
        "typeId": "nace_61_1",
        "subclasses": []
    }, {
        "typeId": "nace_68_1",
        "subclasses": []
    }, {
        "typeId": "nace_01_5",
        "subclasses": []
    }, {
        "typeId": "nace_81_1",
        "subclasses": []
    }, {
        "typeId": "nace_82_3",
        "subclasses": []
    }, {
        "typeId": "nace_82_1",
        "subclasses": []
    }, {
        "typeId": "nace_R",
        "subclasses": [
            "nace_91", "nace_90", "nace_92", "nace_93"
        ]
    }, {
        "typeId": "nace_90",
        "subclasses": [
            "nace_90_0"
        ]
    }, {
        "typeId": "nace_90_0",
        "subclasses": []
    }, {
        "typeId": "nace_52_1",
        "subclasses": []
    }, {
        "typeId": "nace_52",
        "subclasses": [
            "nace_52_2", "nace_52_1"
        ]
    }, {
        "typeId": "nace_53_1",
        "subclasses": []
    }, {
        "typeId": "nace_49",
        "subclasses": [
            "nace_49_3", "nace_49_2", "nace_49_4", "nace_49_1", "nace_49_5"
        ]
    }, {
        "typeId": "nace_77_4",
        "subclasses": []
    }, {
        "typeId": "nace_86_2",
        "subclasses": []
    }, {
        "typeId": "nace_92",
        "subclasses": [
            "nace_92_0"
        ]
    }, {
        "typeId": "nace_92_0",
        "subclasses": []
    }, {
        "typeId": "nace_51",
        "subclasses": [
            "nace_51_2", "nace_51_1"
        ]
    }, {
        "typeId": "nace_51_2",
        "subclasses": []
    }, {
        "typeId": "nace_51_1",
        "subclasses": []
    }, {
        "typeId": "nace_T",
        "subclasses": [
            "nace_97"
        ]
    }, {
        "typeId": "nace_97",
        "subclasses": [
            "nace_97_0"
        ]
    }, {
        "typeId": "nace_97_0",
        "subclasses": []
    }, {
        "typeId": "nace_73_2",
        "subclasses": []
    }, {
        "typeId": "nace_38_3",
        "subclasses": []
    }, {
        "typeId": "nace_39",
        "subclasses": [
            "nace_39_0"
        ]
    }, {
        "typeId": "nace_39_0",
        "subclasses": []
    }, {
        "typeId": "nace_94_1",
        "subclasses": []
    }, {
        "typeId": "nace_O",
        "subclasses": [
            "nace_84"
        ]
    }, {
        "typeId": "nace_84",
        "subclasses": [
            "nace_84_1", "nace_84_2", "nace_84_3"
        ]
    }, {
        "typeId": "nace_84_1",
        "subclasses": []
    }, {
        "typeId": "nace_84_2",
        "subclasses": []
    }, {
        "typeId": "nace_L",
        "subclasses": [
            "nace_68"
        ]
    }, {
        "typeId": "nace_68",
        "subclasses": [
            "nace_68_1", "nace_68_3", "nace_68_2"
        ]
    }, {
        "typeId": "nace_68_3",
        "subclasses": []
    }, {
        "typeId": "nace_41",
        "subclasses": [
            "nace_41_2", "nace_41_1"
        ]
    }, {
        "typeId": "nace_41_2",
        "subclasses": []
    }, {
        "typeId": "nace_37",
        "subclasses": [
            "nace_37_0"
        ]
    }, {
        "typeId": "nace_37_0",
        "subclasses": []
    }, {
        "typeId": "nace_25_6",
        "subclasses": []
    }, {
        "typeId": "nace_I",
        "subclasses": [
            "nace_55", "nace_56"
        ]
    }, {
        "typeId": "nace_55",
        "subclasses": [
            "nace_55_9", "nace_55_3", "nace_55_2", "nace_55_1"
        ]
    }, {
        "typeId": "nace_74_3",
        "subclasses": []
    }, {
        "typeId": "nace_49_1",
        "subclasses": []
    }, {
        "typeId": "nace_50_3",
        "subclasses": []
    }, {
        "typeId": "nace_65_3",
        "subclasses": []
    }, {
        "typeId": "nace_01_3",
        "subclasses": []
    }, {
        "typeId": "nace_87",
        "subclasses": [
            "nace_87_9", "nace_87_3", "nace_87_2", "nace_87_1"
        ]
    }, {
        "typeId": "nace_87_1",
        "subclasses": []
    }, {
        "typeId": "nace_53",
        "subclasses": [
            "nace_53_2", "nace_53_1"
        ]
    }, {
        "typeId": "nace_80_1",
        "subclasses": []
    }, {
        "typeId": "nace_23",
        "subclasses": [
            "nace_23_7", "nace_23_4", "nace_23_6", "nace_23_3", "nace_23_1", "nace_23_9", "nace_23_2", "nace_23_5"
        ]
    }, {
        "typeId": "nace_20_5",
        "subclasses": []
    }, {
        "typeId": "nace_28_2",
        "subclasses": []
    }, {
        "typeId": "nace_25_9",
        "subclasses": []
    }, {
        "typeId": "nace_10_8",
        "subclasses": []
    }, {
        "typeId": "nace_23_4",
        "subclasses": []
    }, {
        "typeId": "nace_24_2",
        "subclasses": []
    }, {
        "typeId": "nace_28_9",
        "subclasses": []
    }, {
        "typeId": "nace_13_9",
        "subclasses": []
    }, {
        "typeId": "nace_30",
        "subclasses": [
            "nace_30_1", "nace_30_2", "nace_30_3", "nace_30_4", "nace_30_9"
        ]
    }, {
        "typeId": "nace_27_9",
        "subclasses": []
    }, {
        "typeId": "nace_10_7",
        "subclasses": []
    }, {
        "typeId": "nace_27_2",
        "subclasses": []
    }, {
        "typeId": "nace_27_4",
        "subclasses": []
    }, {
        "typeId": "nace_23_6",
        "subclasses": []
    }, {
        "typeId": "nace_23_3",
        "subclasses": []
    }, {
        "typeId": "nace_25_3",
        "subclasses": []
    }, {
        "typeId": "nace_26",
        "subclasses": [
            "nace_26_2", "nace_26_4", "nace_26_1", "nace_26_3", "nace_26_8", "nace_26_5", "nace_26_7", "nace_26_6"
        ]
    }, {
        "typeId": "nace_26_2",
        "subclasses": []
    }, {
        "typeId": "nace_29_3",
        "subclasses": []
    }, {
        "typeId": "nace_11",
        "subclasses": [
            "nace_11_0"
        ]
    }, {
        "typeId": "nace_11_0",
        "subclasses": []
    }, {
        "typeId": "nace_27",
        "subclasses": [
            "nace_27_9", "nace_27_2", "nace_27_4", "nace_27_1", "nace_27_5", "nace_27_3"
        ]
    }, {
        "typeId": "nace_27_1",
        "subclasses": []
    }, {
        "typeId": "nace_26_4",
        "subclasses": []
    }, {
        "typeId": "nace_26_1",
        "subclasses": []
    }, {
        "typeId": "nace_21_2",
        "subclasses": []
    }, {
        "typeId": "nace_21_1",
        "subclasses": []
    }, {
        "typeId": "nace_21",
        "subclasses": [
            "nace_21_2", "nace_21_1"
        ]
    }, {
        "typeId": "nace_10_9",
        "subclasses": []
    }, {
        "typeId": "nace_35_2",
        "subclasses": []
    }, {
        "typeId": "nace_23_1",
        "subclasses": []
    }, {
        "typeId": "nace_32_1",
        "subclasses": []
    }, {
        "typeId": "nace_22",
        "subclasses": [
            "nace_22_1", "nace_22_2"
        ]
    }, {
        "typeId": "nace_22_1",
        "subclasses": []
    }, {
        "typeId": "nace_27_5",
        "subclasses": []
    }, {
        "typeId": "nace_24_4",
        "subclasses": []
    }, {
        "typeId": "nace_23_9",
        "subclasses": []
    }, {
        "typeId": "nace_23_2",
        "subclasses": []
    }, {
        "typeId": "nace_24_1",
        "subclasses": []
    }, {
        "typeId": "nace_28_3",
        "subclasses": []
    }, {
        "typeId": "nace_29_2",
        "subclasses": []
    }, {
        "typeId": "nace_20",
        "subclasses": [
            "nace_20_5", "nace_20_1", "nace_20_6", "nace_20_3", "nace_20_2", "nace_20_4"
        ]
    }, {
        "typeId": "nace_20_1",
        "subclasses": []
    }, {
        "typeId": "nace_25_7",
        "subclasses": []
    }, {
        "typeId": "nace_14",
        "subclasses": [
            "nace_14_3", "nace_14_1", "nace_14_2"
        ]
    }, {
        "typeId": "nace_14_3",
        "subclasses": []
    }, {
        "typeId": "nace_14_1",
        "subclasses": []
    }, {
        "typeId": "nace_26_3",
        "subclasses": []
    }, {
        "typeId": "nace_10_6",
        "subclasses": []
    }, {
        "typeId": "nace_19",
        "subclasses": [
            "nace_19_1", "nace_19_2"
        ]
    }, {
        "typeId": "nace_19_1",
        "subclasses": []
    }, {
        "typeId": "nace_20_6",
        "subclasses": []
    }, {
        "typeId": "nace_27_3",
        "subclasses": []
    }, {
        "typeId": "nace_30_2",
        "subclasses": []
    }, {
        "typeId": "nace_30_3",
        "subclasses": []
    }, {
        "typeId": "nace_15",
        "subclasses": [
            "nace_15_1", "nace_15_2"
        ]
    }, {
        "typeId": "nace_26_8",
        "subclasses": []
    }, {
        "typeId": "nace_20_3",
        "subclasses": []
    }, {
        "typeId": "nace_28_1",
        "subclasses": []
    }, {
        "typeId": "nace_28",
        "subclasses": [
            "nace_28_2", "nace_28_9", "nace_28_3", "nace_28_1", "nace_28_4"
        ]
    }, {
        "typeId": "nace_28_4",
        "subclasses": []
    }, {
        "typeId": "nace_32_5",
        "subclasses": []
    }, {
        "typeId": "nace_10_5",
        "subclasses": []
    }, {
        "typeId": "nace_24",
        "subclasses": [
            "nace_24_3", "nace_24_2", "nace_24_4", "nace_24_1", "nace_24_5"
        ]
    }, {
        "typeId": "nace_25_1",
        "subclasses": []
    }, {
        "typeId": "nace_25",
        "subclasses": [
            "nace_25_6", "nace_25_9", "nace_25_3", "nace_25_7", "nace_25_1", "nace_25_2", "nace_25_4", "nace_25_5"
        ]
    }, {
        "typeId": "nace_30_4",
        "subclasses": []
    }, {
        "typeId": "nace_29_1",
        "subclasses": []
    }, {
        "typeId": "nace_29",
        "subclasses": [
            "nace_29_3", "nace_29_2", "nace_29_1"
        ]
    }, {
        "typeId": "nace_32_2",
        "subclasses": []
    }, {
        "typeId": "nace_26_5",
        "subclasses": []
    }, {
        "typeId": "nace_31",
        "subclasses": [
            "nace_31_0"
        ]
    }, {
        "typeId": "nace_31_0",
        "subclasses": []
    }, {
        "typeId": "nace_10",
        "subclasses": [
            "nace_10_2", "nace_10_3", "nace_10_8", "nace_10_7", "nace_10_9", "nace_10_6", "nace_10_5", "nace_10_4", "nace_10_1"
        ]
    }, {
        "typeId": "nace_26_7",
        "subclasses": []
    }, {
        "typeId": "nace_17",
        "subclasses": [
            "nace_17_1", "nace_17_2"
        ]
    }, {
        "typeId": "nace_17_1",
        "subclasses": []
    }, {
        "typeId": "nace_14_2",
        "subclasses": []
    }, {
        "typeId": "nace_20_2",
        "subclasses": []
    }, {
        "typeId": "nace_22_2",
        "subclasses": []
    }, {
        "typeId": "nace_19_2",
        "subclasses": []
    }, {
        "typeId": "nace_23_5",
        "subclasses": []
    }, {
        "typeId": "nace_15_2",
        "subclasses": []
    }, {
        "typeId": "nace_32_4",
        "subclasses": []
    }, {
        "typeId": "nace_32_3",
        "subclasses": []
    }, {
        "typeId": "nace_26_6",
        "subclasses": []
    }, {
        "typeId": "nace_20_4",
        "subclasses": []
    }, {
        "typeId": "nace_25_2",
        "subclasses": []
    }, {
        "typeId": "nace_13",
        "subclasses": [
            "nace_13_1", "nace_13_3", "nace_13_9", "nace_13_2"
        ]
    }, {
        "typeId": "nace_12",
        "subclasses": [
            "nace_12_0"
        ]
    }, {
        "typeId": "nace_12_0",
        "subclasses": []
    }, {
        "typeId": "nace_30_9",
        "subclasses": []
    }, {
        "typeId": "nace_16",
        "subclasses": [
            "nace_16_2", "nace_16_1"
        ]
    }, {
        "typeId": "nace_17_2",
        "subclasses": []
    }, {
        "typeId": "nace_16_2",
        "subclasses": []
    }, {
        "typeId": "nace_10_4",
        "subclasses": []
    }, {
        "typeId": "nace_25_4",
        "subclasses": []
    }, {
        "typeId": "nace_59_2",
        "subclasses": []
    }, {
        "typeId": "nace_10_1",
        "subclasses": []
    }, {
        "typeId": "nace_35_1",
        "subclasses": []
    }, {
        "typeId": "nace_60",
        "subclasses": [
            "nace_60_2", "nace_60_1"
        ]
    }, {
        "typeId": "nace_60_1",
        "subclasses": []
    }, {
        "typeId": "nace_69_2",
        "subclasses": []
    }, {
        "typeId": "nace_79_1",
        "subclasses": []
    }, {
        "typeId": "nace_79",
        "subclasses": [
            "nace_79_9", "nace_79_1"
        ]
    }, {
        "typeId": "nace_78_1",
        "subclasses": []
    }, {
        "typeId": "nace_81_2",
        "subclasses": []
    }, {
        "typeId": "nace_95_1",
        "subclasses": []
    }, {
        "typeId": "nace_95",
        "subclasses": [
            "nace_95_1", "nace_95_2"
        ]
    }, {
        "typeId": "nace_95_2",
        "subclasses": []
    }, {
        "typeId": "nace_33_1",
        "subclasses": []
    }, {
        "typeId": "nace_33",
        "subclasses": [
            "nace_33_2", "nace_33_1"
        ]
    }, {
        "typeId": "nace_18_2",
        "subclasses": []
    }, {
        "typeId": "nace_56_1",
        "subclasses": []
    }, {
        "typeId": "nace_43_1",
        "subclasses": []
    }, {
        "typeId": "nace_49_5",
        "subclasses": []
    }, {
        "typeId": "nace_16_1",
        "subclasses": []
    }, {
        "typeId": "nace_61_3",
        "subclasses": []
    }, {
        "typeId": "nac_Nacekode",
        "subclasses": [
            "nace_S", "nace_B", "nace_F", "nace_D", "nace_M", "nace_K", "nace_N", "nace_Q", "nace_C", "nace_J", "nace_U", "nace_A", "nace_R", "nace_T", "nace_O", "nace_L", "nace_I", "nace_H", "nace_P", "nace_E", "nace_G"
        ]
    }, {
        "typeId": "nace_56",
        "subclasses": [
            "nace_56_2", "nace_56_3", "nace_56_1"
        ]
    }, {
        "typeId": "nace_50",
        "subclasses": [
            "nace_50_4", "nace_50_3", "nace_50_2", "nace_50_1"
        ]
    }, {
        "typeId": "nace_50_2",
        "subclasses": []
    }, {
        "typeId": "nace_50_1",
        "subclasses": []
    }, {
        "typeId": "nace_02",
        "subclasses": [
            "nace_02_2", "nace_02_3", "nace_02_1", "nace_02_4"
        ]
    }, {
        "typeId": "nace_02_1",
        "subclasses": []
    }, {
        "typeId": "nace_25_5",
        "subclasses": []
    }, {
        "typeId": "nace_88",
        "subclasses": [
            "nace_88_9", "nace_88_1"
        ]
    }, {
        "typeId": "nace_88_1",
        "subclasses": []
    }, {
        "typeId": "nace_43",
        "subclasses": [
            "nace_43_9", "nace_43_2", "nace_43_3", "nace_43_1"
        ]
    }, {
        "typeId": "nace_74_1",
        "subclasses": []
    }, {
        "typeId": "nace_93",
        "subclasses": [
            "nace_93_2", "nace_93_1"
        ]
    }, {
        "typeId": "nace_93_1",
        "subclasses": []
    }, {
        "typeId": "nace_24_5",
        "subclasses": []
    }, {
        "typeId": "nace_86_1",
        "subclasses": []
    }, {
        "typeId": "nace_71_2",
        "subclasses": []
    }, {
        "typeId": "nace_82_2",
        "subclasses": []
    }, {
        "typeId": "nace_61",
        "subclasses": [
            "nace_61_1", "nace_61_3", "nace_61_9", "nace_61_2"
        ]
    }, {
        "typeId": "nace_61_9",
        "subclasses": []
    }, {
        "typeId": "nace_09_9",
        "subclasses": []
    }, {
        "typeId": "nace_09",
        "subclasses": [
            "nace_09_9", "nace_09_1"
        ]
    }, {
        "typeId": "nace_81",
        "subclasses": [
            "nace_81_3", "nace_81_1", "nace_81_2"
        ]
    }, {
        "typeId": "nace_66",
        "subclasses": [
            "nace_66_3", "nace_66_1", "nace_66_2"
        ]
    }, {
        "typeId": "nace_66_1",
        "subclasses": []
    }, {
        "typeId": "nace_66_2",
        "subclasses": []
    }, {
        "typeId": "nace_62",
        "subclasses": [
            "nace_62_0"
        ]
    }, {
        "typeId": "nace_62_0",
        "subclasses": []
    }, {
        "typeId": "nace_01_6",
        "subclasses": []
    }, {
        "typeId": "nace_02_4",
        "subclasses": []
    }, {
        "typeId": "nace_85_6",
        "subclasses": []
    }, {
        "typeId": "nace_09_1",
        "subclasses": []
    }, {
        "typeId": "nace_80_2",
        "subclasses": []
    }, {
        "typeId": "nace_47_8",
        "subclasses": []
    }, {
        "typeId": "nace_H",
        "subclasses": [
            "nace_52", "nace_49", "nace_51", "nace_53", "nace_50"
        ]
    }, {
        "typeId": "nace_84_3",
        "subclasses": []
    }, {
        "typeId": "nace_18",
        "subclasses": [
            "nace_18_2", "nace_18_1"
        ]
    }, {
        "typeId": "nace_18_1",
        "subclasses": []
    }, {
        "typeId": "nace_61_2",
        "subclasses": []
    }, {
        "typeId": "nace_P",
        "subclasses": [
            "nace_85"
        ]
    }, {
        "typeId": "nace_85",
        "subclasses": [
            "nace_85_5", "nace_85_1", "nace_85_2", "nace_85_6", "nace_85_4", "nace_85_3"
        ]
    }, {
        "typeId": "nace_85_4",
        "subclasses": []
    }, {
        "typeId": "nace_85_3",
        "subclasses": []
    }, {
        "typeId": "nace_46_9",
        "subclasses": []
    }, {
        "typeId": "nace_58_1",
        "subclasses": []
    }, {
        "typeId": "nace_58_2",
        "subclasses": []
    }, {
        "typeId": "nace_78_2",
        "subclasses": []
    }, {
        "typeId": "nace_68_2",
        "subclasses": []
    }, {
        "typeId": "nace_77_3",
        "subclasses": []
    }, {
        "typeId": "nace_77_2",
        "subclasses": []
    }, {
        "typeId": "nace_77_1",
        "subclasses": []
    }, {
        "typeId": "nace_77",
        "subclasses": [
            "nace_77_4", "nace_77_3", "nace_77_2", "nace_77_1"
        ]
    }, {
        "typeId": "nace_36",
        "subclasses": [
            "nace_36_0"
        ]
    }, {
        "typeId": "nace_36_0",
        "subclasses": []
    }, {
        "typeId": "nace_41_1",
        "subclasses": []
    }, {
        "typeId": "nace_06_2",
        "subclasses": []
    }, {
        "typeId": "nace_06_1",
        "subclasses": []
    }, {
        "typeId": "nace_06",
        "subclasses": [
            "nace_06_2", "nace_06_1"
        ]
    }, {
        "typeId": "nace_80",
        "subclasses": [
            "nace_80_3", "nace_80_1", "nace_80_2"
        ]
    }, {
        "typeId": "nace_E",
        "subclasses": [
            "nace_38", "nace_39", "nace_37", "nace_36"
        ]
    }, {
        "typeId": "nace_G",
        "subclasses": [
            "nace_46", "nace_47", "nace_45"
        ]
    }, {
        "typeId": "nace_45_2",
        "subclasses": []
    }, {
        "typeId": "nace_64_3",
        "subclasses": []
    }, {
        "typeId": "nace_75",
        "subclasses": [
            "nace_75_0"
        ]
    }, {
        "typeId": "nace_75_0",
        "subclasses": []
    }, {
        "typeId": "nace_13_2",
        "subclasses": []
    }, {
        "typeId": "nace_59_1",
        "subclasses": []
    }
];

var jsonSuperclassRelations = [
    {
        "typeId": "nace_70_2",
        "superclasses": [
            "nace_70"
        ]
    }, {
        "typeId": "nace_46",
        "superclasses": [
            "nace_G"
        ]
    }, {
        "typeId": "nace_46_1",
        "superclasses": [
            "nace_46"
        ]
    }, {
        "typeId": "nace_94_9",
        "superclasses": [
            "nace_94"
        ]
    }, {
        "typeId": "nace_94",
        "superclasses": [
            "nace_S"
        ]
    }, {
        "typeId": "nace_03_2",
        "superclasses": [
            "nace_03"
        ]
    }, {
        "typeId": "nace_86_9",
        "superclasses": [
            "nace_86"
        ]
    }, {
        "typeId": "nace_63_9",
        "superclasses": [
            "nace_63"
        ]
    }, {
        "typeId": "nace_87_9",
        "superclasses": [
            "nace_87"
        ]
    }, {
        "typeId": "nace_78_3",
        "superclasses": [
            "nace_78"
        ]
    }, {
        "typeId": "nace_53_2",
        "superclasses": [
            "nace_53"
        ]
    }, {
        "typeId": "nace_88_9",
        "superclasses": [
            "nace_88"
        ]
    }, {
        "typeId": "nace_52_2",
        "superclasses": [
            "nace_52"
        ]
    }, {
        "typeId": "nace_42",
        "superclasses": [
            "nace_F"
        ]
    }, {
        "typeId": "nace_79_9",
        "superclasses": [
            "nace_79"
        ]
    }, {
        "typeId": "nace_24_3",
        "superclasses": [
            "nace_24"
        ]
    }, {
        "typeId": "nace_08_9",
        "superclasses": [
            "nace_08"
        ]
    }, {
        "typeId": "nace_47_7",
        "superclasses": [
            "nace_47"
        ]
    }, {
        "typeId": "nace_74",
        "superclasses": [
            "nace_M"
        ]
    }, {
        "typeId": "nace_74_9",
        "superclasses": [
            "nace_74"
        ]
    }, {
        "typeId": "nace_64_9",
        "superclasses": [
            "nace_64"
        ]
    }, {
        "typeId": "nace_82",
        "superclasses": [
            "nace_N"
        ]
    }, {
        "typeId": "nace_32",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_49_3",
        "superclasses": [
            "nace_49"
        ]
    }, {
        "typeId": "nace_55_9",
        "superclasses": [
            "nace_55"
        ]
    }, {
        "typeId": "nace_96",
        "superclasses": [
            "nace_S"
        ]
    }, {
        "typeId": "nace_96_0",
        "superclasses": [
            "nace_96"
        ]
    }, {
        "typeId": "nace_43_9",
        "superclasses": [
            "nace_43"
        ]
    }, {
        "typeId": "nace_S",
        "superclasses": [
            "nac_Nacekode"
        ]
    }, {
        "typeId": "nace_85_5",
        "superclasses": [
            "nace_85"
        ]
    }, {
        "typeId": "nace_73_1",
        "superclasses": [
            "nace_73"
        ]
    }, {
        "typeId": "nace_73",
        "superclasses": [
            "nace_M"
        ]
    }, {
        "typeId": "nace_78",
        "superclasses": [
            "nace_N"
        ]
    }, {
        "typeId": "nace_94_2",
        "superclasses": [
            "nace_94"
        ]
    }, {
        "typeId": "nace_71_1",
        "superclasses": [
            "nace_71"
        ]
    }, {
        "typeId": "nace_71",
        "superclasses": [
            "nace_M"
        ]
    }, {
        "typeId": "nace_02_2",
        "superclasses": [
            "nace_02"
        ]
    }, {
        "typeId": "nace_64_1",
        "superclasses": [
            "nace_64"
        ]
    }, {
        "typeId": "nace_10_2",
        "superclasses": [
            "nace_10"
        ]
    }, {
        "typeId": "nace_10_3",
        "superclasses": [
            "nace_10"
        ]
    }, {
        "typeId": "nace_13_1",
        "superclasses": [
            "nace_13"
        ]
    }, {
        "typeId": "nace_38_2",
        "superclasses": [
            "nace_38"
        ]
    }, {
        "typeId": "nace_81_3",
        "superclasses": [
            "nace_81"
        ]
    }, {
        "typeId": "nace_15_1",
        "superclasses": [
            "nace_15"
        ]
    }, {
        "typeId": "nace_B",
        "superclasses": [
            "nac_Nacekode"
        ]
    }, {
        "typeId": "nace_05_2",
        "superclasses": [
            "nace_05"
        ]
    }, {
        "typeId": "nace_07_2",
        "superclasses": [
            "nace_07"
        ]
    }, {
        "typeId": "nace_07_1",
        "superclasses": [
            "nace_07"
        ]
    }, {
        "typeId": "nace_07",
        "superclasses": [
            "nace_B"
        ]
    }, {
        "typeId": "nace_08_1",
        "superclasses": [
            "nace_08"
        ]
    }, {
        "typeId": "nace_05_1",
        "superclasses": [
            "nace_05"
        ]
    }, {
        "typeId": "nace_05",
        "superclasses": [
            "nace_B"
        ]
    }, {
        "typeId": "nace_08",
        "superclasses": [
            "nace_B"
        ]
    }, {
        "typeId": "nace_47_4",
        "superclasses": [
            "nace_47"
        ]
    }, {
        "typeId": "nace_47_5",
        "superclasses": [
            "nace_47"
        ]
    }, {
        "typeId": "nace_47_1",
        "superclasses": [
            "nace_47"
        ]
    }, {
        "typeId": "nace_47_6",
        "superclasses": [
            "nace_47"
        ]
    }, {
        "typeId": "nace_47_2",
        "superclasses": [
            "nace_47"
        ]
    }, {
        "typeId": "nace_F",
        "superclasses": [
            "nac_Nacekode"
        ]
    }, {
        "typeId": "nace_42_9",
        "superclasses": [
            "nace_42"
        ]
    }, {
        "typeId": "nace_30_1",
        "superclasses": [
            "nace_30"
        ]
    }, {
        "typeId": "nace_42_2",
        "superclasses": [
            "nace_42"
        ]
    }, {
        "typeId": "nace_42_1",
        "superclasses": [
            "nace_42"
        ]
    }, {
        "typeId": "nace_56_2",
        "superclasses": [
            "nace_56"
        ]
    }, {
        "typeId": "nace_35_3",
        "superclasses": [
            "nace_35"
        ]
    }, {
        "typeId": "nace_63_1",
        "superclasses": [
            "nace_63"
        ]
    }, {
        "typeId": "nace_47_3",
        "superclasses": [
            "nace_47"
        ]
    }, {
        "typeId": "nace_47_9",
        "superclasses": [
            "nace_47"
        ]
    }, {
        "typeId": "nace_47",
        "superclasses": [
            "nace_G"
        ]
    }, {
        "typeId": "nace_56_3",
        "superclasses": [
            "nace_56"
        ]
    }, {
        "typeId": "nace_91",
        "superclasses": [
            "nace_R"
        ]
    }, {
        "typeId": "nace_91_0",
        "superclasses": [
            "nace_91"
        ]
    }, {
        "typeId": "nace_55_3",
        "superclasses": [
            "nace_55"
        ]
    }, {
        "typeId": "nace_55_2",
        "superclasses": [
            "nace_55"
        ]
    }, {
        "typeId": "nace_01_1",
        "superclasses": [
            "nace_01"
        ]
    }, {
        "typeId": "nace_01_2",
        "superclasses": [
            "nace_01"
        ]
    }, {
        "typeId": "nace_D",
        "superclasses": [
            "nac_Nacekode"
        ]
    }, {
        "typeId": "nace_35",
        "superclasses": [
            "nace_D"
        ]
    }, {
        "typeId": "nace_43_2",
        "superclasses": [
            "nace_43"
        ]
    }, {
        "typeId": "nace_46_5",
        "superclasses": [
            "nace_46"
        ]
    }, {
        "typeId": "nace_46_6",
        "superclasses": [
            "nace_46"
        ]
    }, {
        "typeId": "nace_46_4",
        "superclasses": [
            "nace_46"
        ]
    }, {
        "typeId": "nace_46_2",
        "superclasses": [
            "nace_46"
        ]
    }, {
        "typeId": "nace_46_3",
        "superclasses": [
            "nace_46"
        ]
    }, {
        "typeId": "nace_46_7",
        "superclasses": [
            "nace_46"
        ]
    }, {
        "typeId": "nace_13_3",
        "superclasses": [
            "nace_13"
        ]
    }, {
        "typeId": "nace_80_3",
        "superclasses": [
            "nace_80"
        ]
    }, {
        "typeId": "nace_M",
        "superclasses": [
            "nac_Nacekode"
        ]
    }, {
        "typeId": "nace_43_3",
        "superclasses": [
            "nace_43"
        ]
    }, {
        "typeId": "nace_59",
        "superclasses": [
            "nace_J"
        ]
    }, {
        "typeId": "nace_K",
        "superclasses": [
            "nac_Nacekode"
        ]
    }, {
        "typeId": "nace_64",
        "superclasses": [
            "nace_K"
        ]
    }, {
        "typeId": "nace_03_1",
        "superclasses": [
            "nace_03"
        ]
    }, {
        "typeId": "nace_03",
        "superclasses": [
            "nace_A"
        ]
    }, {
        "typeId": "nace_60_2",
        "superclasses": [
            "nace_60"
        ]
    }, {
        "typeId": "nace_66_3",
        "superclasses": [
            "nace_66"
        ]
    }, {
        "typeId": "nace_58",
        "superclasses": [
            "nace_J"
        ]
    }, {
        "typeId": "nace_N",
        "superclasses": [
            "nac_Nacekode"
        ]
    }, {
        "typeId": "nace_82_9",
        "superclasses": [
            "nace_82"
        ]
    }, {
        "typeId": "nace_65_1",
        "superclasses": [
            "nace_65"
        ]
    }, {
        "typeId": "nace_65",
        "superclasses": [
            "nace_K"
        ]
    }, {
        "typeId": "nace_72",
        "superclasses": [
            "nace_M"
        ]
    }, {
        "typeId": "nace_72_1",
        "superclasses": [
            "nace_72"
        ]
    }, {
        "typeId": "nace_72_2",
        "superclasses": [
            "nace_72"
        ]
    }, {
        "typeId": "nace_74_2",
        "superclasses": [
            "nace_74"
        ]
    }, {
        "typeId": "nace_93_2",
        "superclasses": [
            "nace_93"
        ]
    }, {
        "typeId": "nace_85_1",
        "superclasses": [
            "nace_85"
        ]
    }, {
        "typeId": "nace_65_2",
        "superclasses": [
            "nace_65"
        ]
    }, {
        "typeId": "nace_49_2",
        "superclasses": [
            "nace_49"
        ]
    }, {
        "typeId": "nace_50_4",
        "superclasses": [
            "nace_50"
        ]
    }, {
        "typeId": "nace_49_4",
        "superclasses": [
            "nace_49"
        ]
    }, {
        "typeId": "nace_85_2",
        "superclasses": [
            "nace_85"
        ]
    }, {
        "typeId": "nace_45_3",
        "superclasses": [
            "nace_45"
        ]
    }, {
        "typeId": "nace_45_4",
        "superclasses": [
            "nace_45"
        ]
    }, {
        "typeId": "nace_45_1",
        "superclasses": [
            "nace_45"
        ]
    }, {
        "typeId": "nace_45",
        "superclasses": [
            "nace_G"
        ]
    }, {
        "typeId": "nace_Q",
        "superclasses": [
            "nac_Nacekode"
        ]
    }, {
        "typeId": "nace_86",
        "superclasses": [
            "nace_Q"
        ]
    }, {
        "typeId": "nace_23_7",
        "superclasses": [
            "nace_23"
        ]
    }, {
        "typeId": "nace_64_2",
        "superclasses": [
            "nace_64"
        ]
    }, {
        "typeId": "nace_55_1",
        "superclasses": [
            "nace_55"
        ]
    }, {
        "typeId": "nace_70_1",
        "superclasses": [
            "nace_70"
        ]
    }, {
        "typeId": "nace_70",
        "superclasses": [
            "nace_M"
        ]
    }, {
        "typeId": "nace_01_4",
        "superclasses": [
            "nace_01"
        ]
    }, {
        "typeId": "nace_C",
        "superclasses": [
            "nac_Nacekode"
        ]
    }, {
        "typeId": "nace_32_9",
        "superclasses": [
            "nace_32"
        ]
    }, {
        "typeId": "nace_J",
        "superclasses": [
            "nac_Nacekode"
        ]
    }, {
        "typeId": "nace_63",
        "superclasses": [
            "nace_J"
        ]
    }, {
        "typeId": "nace_38_1",
        "superclasses": [
            "nace_38"
        ]
    }, {
        "typeId": "nace_02_3",
        "superclasses": [
            "nace_02"
        ]
    }, {
        "typeId": "nace_38",
        "superclasses": [
            "nace_E"
        ]
    }, {
        "typeId": "nace_33_2",
        "superclasses": [
            "nace_33"
        ]
    }, {
        "typeId": "nace_87_3",
        "superclasses": [
            "nace_87"
        ]
    }, {
        "typeId": "nace_87_2",
        "superclasses": [
            "nace_87"
        ]
    }, {
        "typeId": "nace_U",
        "superclasses": [
            "nac_Nacekode"
        ]
    }, {
        "typeId": "nace_99",
        "superclasses": [
            "nace_U"
        ]
    }, {
        "typeId": "nace_99_0",
        "superclasses": [
            "nace_99"
        ]
    }, {
        "typeId": "nace_01_7",
        "superclasses": [
            "nace_01"
        ]
    }, {
        "typeId": "nace_01",
        "superclasses": [
            "nace_A"
        ]
    }, {
        "typeId": "nace_A",
        "superclasses": [
            "nac_Nacekode"
        ]
    }, {
        "typeId": "nace_69",
        "superclasses": [
            "nace_M"
        ]
    }, {
        "typeId": "nace_69_1",
        "superclasses": [
            "nace_69"
        ]
    }, {
        "typeId": "nace_61_1",
        "superclasses": [
            "nace_61"
        ]
    }, {
        "typeId": "nace_68_1",
        "superclasses": [
            "nace_68"
        ]
    }, {
        "typeId": "nace_01_5",
        "superclasses": [
            "nace_01"
        ]
    }, {
        "typeId": "nace_81_1",
        "superclasses": [
            "nace_81"
        ]
    }, {
        "typeId": "nace_82_3",
        "superclasses": [
            "nace_82"
        ]
    }, {
        "typeId": "nace_82_1",
        "superclasses": [
            "nace_82"
        ]
    }, {
        "typeId": "nace_R",
        "superclasses": [
            "nac_Nacekode"
        ]
    }, {
        "typeId": "nace_90",
        "superclasses": [
            "nace_R"
        ]
    }, {
        "typeId": "nace_90_0",
        "superclasses": [
            "nace_90"
        ]
    }, {
        "typeId": "nace_52_1",
        "superclasses": [
            "nace_52"
        ]
    }, {
        "typeId": "nace_52",
        "superclasses": [
            "nace_H"
        ]
    }, {
        "typeId": "nace_53_1",
        "superclasses": [
            "nace_53"
        ]
    }, {
        "typeId": "nace_49",
        "superclasses": [
            "nace_H"
        ]
    }, {
        "typeId": "nace_77_4",
        "superclasses": [
            "nace_77"
        ]
    }, {
        "typeId": "nace_86_2",
        "superclasses": [
            "nace_86"
        ]
    }, {
        "typeId": "nace_92",
        "superclasses": [
            "nace_R"
        ]
    }, {
        "typeId": "nace_92_0",
        "superclasses": [
            "nace_92"
        ]
    }, {
        "typeId": "nace_51",
        "superclasses": [
            "nace_H"
        ]
    }, {
        "typeId": "nace_51_2",
        "superclasses": [
            "nace_51"
        ]
    }, {
        "typeId": "nace_51_1",
        "superclasses": [
            "nace_51"
        ]
    }, {
        "typeId": "nace_T",
        "superclasses": [
            "nac_Nacekode"
        ]
    }, {
        "typeId": "nace_97",
        "superclasses": [
            "nace_T"
        ]
    }, {
        "typeId": "nace_97_0",
        "superclasses": [
            "nace_97"
        ]
    }, {
        "typeId": "nace_73_2",
        "superclasses": [
            "nace_73"
        ]
    }, {
        "typeId": "nace_38_3",
        "superclasses": [
            "nace_38"
        ]
    }, {
        "typeId": "nace_39",
        "superclasses": [
            "nace_E"
        ]
    }, {
        "typeId": "nace_39_0",
        "superclasses": [
            "nace_39"
        ]
    }, {
        "typeId": "nace_94_1",
        "superclasses": [
            "nace_94"
        ]
    }, {
        "typeId": "nace_O",
        "superclasses": [
            "nac_Nacekode"
        ]
    }, {
        "typeId": "nace_84",
        "superclasses": [
            "nace_O"
        ]
    }, {
        "typeId": "nace_84_1",
        "superclasses": [
            "nace_84"
        ]
    }, {
        "typeId": "nace_84_2",
        "superclasses": [
            "nace_84"
        ]
    }, {
        "typeId": "nace_L",
        "superclasses": [
            "nac_Nacekode"
        ]
    }, {
        "typeId": "nace_68",
        "superclasses": [
            "nace_L"
        ]
    }, {
        "typeId": "nace_68_3",
        "superclasses": [
            "nace_68"
        ]
    }, {
        "typeId": "nace_41",
        "superclasses": [
            "nace_F"
        ]
    }, {
        "typeId": "nace_41_2",
        "superclasses": [
            "nace_41"
        ]
    }, {
        "typeId": "nace_37",
        "superclasses": [
            "nace_E"
        ]
    }, {
        "typeId": "nace_37_0",
        "superclasses": [
            "nace_37"
        ]
    }, {
        "typeId": "nace_25_6",
        "superclasses": [
            "nace_25"
        ]
    }, {
        "typeId": "nace_I",
        "superclasses": [
            "nac_Nacekode"
        ]
    }, {
        "typeId": "nace_55",
        "superclasses": [
            "nace_I"
        ]
    }, {
        "typeId": "nace_74_3",
        "superclasses": [
            "nace_74"
        ]
    }, {
        "typeId": "nace_49_1",
        "superclasses": [
            "nace_49"
        ]
    }, {
        "typeId": "nace_50_3",
        "superclasses": [
            "nace_50"
        ]
    }, {
        "typeId": "nace_65_3",
        "superclasses": [
            "nace_65"
        ]
    }, {
        "typeId": "nace_01_3",
        "superclasses": [
            "nace_01"
        ]
    }, {
        "typeId": "nace_87",
        "superclasses": [
            "nace_Q"
        ]
    }, {
        "typeId": "nace_87_1",
        "superclasses": [
            "nace_87"
        ]
    }, {
        "typeId": "nace_53",
        "superclasses": [
            "nace_H"
        ]
    }, {
        "typeId": "nace_80_1",
        "superclasses": [
            "nace_80"
        ]
    }, {
        "typeId": "nace_23",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_20_5",
        "superclasses": [
            "nace_20"
        ]
    }, {
        "typeId": "nace_28_2",
        "superclasses": [
            "nace_28"
        ]
    }, {
        "typeId": "nace_25_9",
        "superclasses": [
            "nace_25"
        ]
    }, {
        "typeId": "nace_10_8",
        "superclasses": [
            "nace_10"
        ]
    }, {
        "typeId": "nace_23_4",
        "superclasses": [
            "nace_23"
        ]
    }, {
        "typeId": "nace_24_2",
        "superclasses": [
            "nace_24"
        ]
    }, {
        "typeId": "nace_28_9",
        "superclasses": [
            "nace_28"
        ]
    }, {
        "typeId": "nace_13_9",
        "superclasses": [
            "nace_13"
        ]
    }, {
        "typeId": "nace_30",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_27_9",
        "superclasses": [
            "nace_27"
        ]
    }, {
        "typeId": "nace_10_7",
        "superclasses": [
            "nace_10"
        ]
    }, {
        "typeId": "nace_27_2",
        "superclasses": [
            "nace_27"
        ]
    }, {
        "typeId": "nace_27_4",
        "superclasses": [
            "nace_27"
        ]
    }, {
        "typeId": "nace_23_6",
        "superclasses": [
            "nace_23"
        ]
    }, {
        "typeId": "nace_23_3",
        "superclasses": [
            "nace_23"
        ]
    }, {
        "typeId": "nace_25_3",
        "superclasses": [
            "nace_25"
        ]
    }, {
        "typeId": "nace_26",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_26_2",
        "superclasses": [
            "nace_26"
        ]
    }, {
        "typeId": "nace_29_3",
        "superclasses": [
            "nace_29"
        ]
    }, {
        "typeId": "nace_11",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_11_0",
        "superclasses": [
            "nace_11"
        ]
    }, {
        "typeId": "nace_27",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_27_1",
        "superclasses": [
            "nace_27"
        ]
    }, {
        "typeId": "nace_26_4",
        "superclasses": [
            "nace_26"
        ]
    }, {
        "typeId": "nace_26_1",
        "superclasses": [
            "nace_26"
        ]
    }, {
        "typeId": "nace_21_2",
        "superclasses": [
            "nace_21"
        ]
    }, {
        "typeId": "nace_21_1",
        "superclasses": [
            "nace_21"
        ]
    }, {
        "typeId": "nace_21",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_10_9",
        "superclasses": [
            "nace_10"
        ]
    }, {
        "typeId": "nace_35_2",
        "superclasses": [
            "nace_35"
        ]
    }, {
        "typeId": "nace_23_1",
        "superclasses": [
            "nace_23"
        ]
    }, {
        "typeId": "nace_32_1",
        "superclasses": [
            "nace_32"
        ]
    }, {
        "typeId": "nace_22",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_22_1",
        "superclasses": [
            "nace_22"
        ]
    }, {
        "typeId": "nace_27_5",
        "superclasses": [
            "nace_27"
        ]
    }, {
        "typeId": "nace_24_4",
        "superclasses": [
            "nace_24"
        ]
    }, {
        "typeId": "nace_23_9",
        "superclasses": [
            "nace_23"
        ]
    }, {
        "typeId": "nace_23_2",
        "superclasses": [
            "nace_23"
        ]
    }, {
        "typeId": "nace_24_1",
        "superclasses": [
            "nace_24"
        ]
    }, {
        "typeId": "nace_28_3",
        "superclasses": [
            "nace_28"
        ]
    }, {
        "typeId": "nace_29_2",
        "superclasses": [
            "nace_29"
        ]
    }, {
        "typeId": "nace_20",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_20_1",
        "superclasses": [
            "nace_20"
        ]
    }, {
        "typeId": "nace_25_7",
        "superclasses": [
            "nace_25"
        ]
    }, {
        "typeId": "nace_14",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_14_3",
        "superclasses": [
            "nace_14"
        ]
    }, {
        "typeId": "nace_14_1",
        "superclasses": [
            "nace_14"
        ]
    }, {
        "typeId": "nace_26_3",
        "superclasses": [
            "nace_26"
        ]
    }, {
        "typeId": "nace_10_6",
        "superclasses": [
            "nace_10"
        ]
    }, {
        "typeId": "nace_19",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_19_1",
        "superclasses": [
            "nace_19"
        ]
    }, {
        "typeId": "nace_20_6",
        "superclasses": [
            "nace_20"
        ]
    }, {
        "typeId": "nace_27_3",
        "superclasses": [
            "nace_27"
        ]
    }, {
        "typeId": "nace_30_2",
        "superclasses": [
            "nace_30"
        ]
    }, {
        "typeId": "nace_30_3",
        "superclasses": [
            "nace_30"
        ]
    }, {
        "typeId": "nace_15",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_26_8",
        "superclasses": [
            "nace_26"
        ]
    }, {
        "typeId": "nace_20_3",
        "superclasses": [
            "nace_20"
        ]
    }, {
        "typeId": "nace_28_1",
        "superclasses": [
            "nace_28"
        ]
    }, {
        "typeId": "nace_28",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_28_4",
        "superclasses": [
            "nace_28"
        ]
    }, {
        "typeId": "nace_32_5",
        "superclasses": [
            "nace_32"
        ]
    }, {
        "typeId": "nace_10_5",
        "superclasses": [
            "nace_10"
        ]
    }, {
        "typeId": "nace_24",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_25_1",
        "superclasses": [
            "nace_25"
        ]
    }, {
        "typeId": "nace_25",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_30_4",
        "superclasses": [
            "nace_30"
        ]
    }, {
        "typeId": "nace_29_1",
        "superclasses": [
            "nace_29"
        ]
    }, {
        "typeId": "nace_29",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_32_2",
        "superclasses": [
            "nace_32"
        ]
    }, {
        "typeId": "nace_26_5",
        "superclasses": [
            "nace_26"
        ]
    }, {
        "typeId": "nace_31",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_31_0",
        "superclasses": [
            "nace_31"
        ]
    }, {
        "typeId": "nace_10",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_26_7",
        "superclasses": [
            "nace_26"
        ]
    }, {
        "typeId": "nace_17",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_17_1",
        "superclasses": [
            "nace_17"
        ]
    }, {
        "typeId": "nace_14_2",
        "superclasses": [
            "nace_14"
        ]
    }, {
        "typeId": "nace_20_2",
        "superclasses": [
            "nace_20"
        ]
    }, {
        "typeId": "nace_22_2",
        "superclasses": [
            "nace_22"
        ]
    }, {
        "typeId": "nace_19_2",
        "superclasses": [
            "nace_19"
        ]
    }, {
        "typeId": "nace_23_5",
        "superclasses": [
            "nace_23"
        ]
    }, {
        "typeId": "nace_15_2",
        "superclasses": [
            "nace_15"
        ]
    }, {
        "typeId": "nace_32_4",
        "superclasses": [
            "nace_32"
        ]
    }, {
        "typeId": "nace_32_3",
        "superclasses": [
            "nace_32"
        ]
    }, {
        "typeId": "nace_26_6",
        "superclasses": [
            "nace_26"
        ]
    }, {
        "typeId": "nace_20_4",
        "superclasses": [
            "nace_20"
        ]
    }, {
        "typeId": "nace_25_2",
        "superclasses": [
            "nace_25"
        ]
    }, {
        "typeId": "nace_13",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_12",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_12_0",
        "superclasses": [
            "nace_12"
        ]
    }, {
        "typeId": "nace_30_9",
        "superclasses": [
            "nace_30"
        ]
    }, {
        "typeId": "nace_16",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_17_2",
        "superclasses": [
            "nace_17"
        ]
    }, {
        "typeId": "nace_16_2",
        "superclasses": [
            "nace_16"
        ]
    }, {
        "typeId": "nace_10_4",
        "superclasses": [
            "nace_10"
        ]
    }, {
        "typeId": "nace_25_4",
        "superclasses": [
            "nace_25"
        ]
    }, {
        "typeId": "nace_59_2",
        "superclasses": [
            "nace_59"
        ]
    }, {
        "typeId": "nace_10_1",
        "superclasses": [
            "nace_10"
        ]
    }, {
        "typeId": "nace_35_1",
        "superclasses": [
            "nace_35"
        ]
    }, {
        "typeId": "nace_60",
        "superclasses": [
            "nace_J"
        ]
    }, {
        "typeId": "nace_60_1",
        "superclasses": [
            "nace_60"
        ]
    }, {
        "typeId": "nace_69_2",
        "superclasses": [
            "nace_69"
        ]
    }, {
        "typeId": "nace_79_1",
        "superclasses": [
            "nace_79"
        ]
    }, {
        "typeId": "nace_79",
        "superclasses": [
            "nace_N"
        ]
    }, {
        "typeId": "nace_78_1",
        "superclasses": [
            "nace_78"
        ]
    }, {
        "typeId": "nace_81_2",
        "superclasses": [
            "nace_81"
        ]
    }, {
        "typeId": "nace_95_1",
        "superclasses": [
            "nace_95"
        ]
    }, {
        "typeId": "nace_95",
        "superclasses": [
            "nace_S"
        ]
    }, {
        "typeId": "nace_95_2",
        "superclasses": [
            "nace_95"
        ]
    }, {
        "typeId": "nace_33_1",
        "superclasses": [
            "nace_33"
        ]
    }, {
        "typeId": "nace_33",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_18_2",
        "superclasses": [
            "nace_18"
        ]
    }, {
        "typeId": "nace_56_1",
        "superclasses": [
            "nace_56"
        ]
    }, {
        "typeId": "nace_43_1",
        "superclasses": [
            "nace_43"
        ]
    }, {
        "typeId": "nace_49_5",
        "superclasses": [
            "nace_49"
        ]
    }, {
        "typeId": "nace_16_1",
        "superclasses": [
            "nace_16"
        ]
    }, {
        "typeId": "nace_61_3",
        "superclasses": [
            "nace_61"
        ]
    }, {
        "typeId": "nac_Nacekode",
        "superclasses": []
    }, {
        "typeId": "nace_56",
        "superclasses": [
            "nace_I"
        ]
    }, {
        "typeId": "nace_50",
        "superclasses": [
            "nace_H"
        ]
    }, {
        "typeId": "nace_50_2",
        "superclasses": [
            "nace_50"
        ]
    }, {
        "typeId": "nace_50_1",
        "superclasses": [
            "nace_50"
        ]
    }, {
        "typeId": "nace_02",
        "superclasses": [
            "nace_A"
        ]
    }, {
        "typeId": "nace_02_1",
        "superclasses": [
            "nace_02"
        ]
    }, {
        "typeId": "nace_25_5",
        "superclasses": [
            "nace_25"
        ]
    }, {
        "typeId": "nace_88",
        "superclasses": [
            "nace_Q"
        ]
    }, {
        "typeId": "nace_88_1",
        "superclasses": [
            "nace_88"
        ]
    }, {
        "typeId": "nace_43",
        "superclasses": [
            "nace_F"
        ]
    }, {
        "typeId": "nace_74_1",
        "superclasses": [
            "nace_74"
        ]
    }, {
        "typeId": "nace_93",
        "superclasses": [
            "nace_R"
        ]
    }, {
        "typeId": "nace_93_1",
        "superclasses": [
            "nace_93"
        ]
    }, {
        "typeId": "nace_24_5",
        "superclasses": [
            "nace_24"
        ]
    }, {
        "typeId": "nace_86_1",
        "superclasses": [
            "nace_86"
        ]
    }, {
        "typeId": "nace_71_2",
        "superclasses": [
            "nace_71"
        ]
    }, {
        "typeId": "nace_82_2",
        "superclasses": [
            "nace_82"
        ]
    }, {
        "typeId": "nace_61",
        "superclasses": [
            "nace_J"
        ]
    }, {
        "typeId": "nace_61_9",
        "superclasses": [
            "nace_61"
        ]
    }, {
        "typeId": "nace_09_9",
        "superclasses": [
            "nace_09"
        ]
    }, {
        "typeId": "nace_09",
        "superclasses": [
            "nace_B"
        ]
    }, {
        "typeId": "nace_81",
        "superclasses": [
            "nace_N"
        ]
    }, {
        "typeId": "nace_66",
        "superclasses": [
            "nace_K"
        ]
    }, {
        "typeId": "nace_66_1",
        "superclasses": [
            "nace_66"
        ]
    }, {
        "typeId": "nace_66_2",
        "superclasses": [
            "nace_66"
        ]
    }, {
        "typeId": "nace_62",
        "superclasses": [
            "nace_J"
        ]
    }, {
        "typeId": "nace_62_0",
        "superclasses": [
            "nace_62"
        ]
    }, {
        "typeId": "nace_01_6",
        "superclasses": [
            "nace_01"
        ]
    }, {
        "typeId": "nace_02_4",
        "superclasses": [
            "nace_02"
        ]
    }, {
        "typeId": "nace_85_6",
        "superclasses": [
            "nace_85"
        ]
    }, {
        "typeId": "nace_09_1",
        "superclasses": [
            "nace_09"
        ]
    }, {
        "typeId": "nace_80_2",
        "superclasses": [
            "nace_80"
        ]
    }, {
        "typeId": "nace_47_8",
        "superclasses": [
            "nace_47"
        ]
    }, {
        "typeId": "nace_H",
        "superclasses": [
            "nac_Nacekode"
        ]
    }, {
        "typeId": "nace_84_3",
        "superclasses": [
            "nace_84"
        ]
    }, {
        "typeId": "nace_18",
        "superclasses": [
            "nace_C"
        ]
    }, {
        "typeId": "nace_18_1",
        "superclasses": [
            "nace_18"
        ]
    }, {
        "typeId": "nace_61_2",
        "superclasses": [
            "nace_61"
        ]
    }, {
        "typeId": "nace_P",
        "superclasses": [
            "nac_Nacekode"
        ]
    }, {
        "typeId": "nace_85",
        "superclasses": [
            "nace_P"
        ]
    }, {
        "typeId": "nace_85_4",
        "superclasses": [
            "nace_85"
        ]
    }, {
        "typeId": "nace_85_3",
        "superclasses": [
            "nace_85"
        ]
    }, {
        "typeId": "nace_46_9",
        "superclasses": [
            "nace_46"
        ]
    }, {
        "typeId": "nace_58_1",
        "superclasses": [
            "nace_58"
        ]
    }, {
        "typeId": "nace_58_2",
        "superclasses": [
            "nace_58"
        ]
    }, {
        "typeId": "nace_78_2",
        "superclasses": [
            "nace_78"
        ]
    }, {
        "typeId": "nace_68_2",
        "superclasses": [
            "nace_68"
        ]
    }, {
        "typeId": "nace_77_3",
        "superclasses": [
            "nace_77"
        ]
    }, {
        "typeId": "nace_77_2",
        "superclasses": [
            "nace_77"
        ]
    }, {
        "typeId": "nace_77_1",
        "superclasses": [
            "nace_77"
        ]
    }, {
        "typeId": "nace_77",
        "superclasses": [
            "nace_N"
        ]
    }, {
        "typeId": "nace_36",
        "superclasses": [
            "nace_E"
        ]
    }, {
        "typeId": "nace_36_0",
        "superclasses": [
            "nace_36"
        ]
    }, {
        "typeId": "nace_41_1",
        "superclasses": [
            "nace_41"
        ]
    }, {
        "typeId": "nace_06_2",
        "superclasses": [
            "nace_06"
        ]
    }, {
        "typeId": "nace_06_1",
        "superclasses": [
            "nace_06"
        ]
    }, {
        "typeId": "nace_06",
        "superclasses": [
            "nace_B"
        ]
    }, {
        "typeId": "nace_80",
        "superclasses": [
            "nace_N"
        ]
    }, {
        "typeId": "nace_E",
        "superclasses": [
            "nac_Nacekode"
        ]
    }, {
        "typeId": "nace_G",
        "superclasses": [
            "nac_Nacekode"
        ]
    }, {
        "typeId": "nace_45_2",
        "superclasses": [
            "nace_45"
        ]
    }, {
        "typeId": "nace_64_3",
        "superclasses": [
            "nace_64"
        ]
    }, {
        "typeId": "nace_75",
        "superclasses": [
            "nace_M"
        ]
    }, {
        "typeId": "nace_75_0",
        "superclasses": [
            "nace_75"
        ]
    }, {
        "typeId": "nace_13_2",
        "superclasses": [
            "nace_13"
        ]
    }, {
        "typeId": "nace_59_1",
        "superclasses": [
            "nace_59"
        ]
    }
];
