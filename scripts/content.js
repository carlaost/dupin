metadataSchemas = [
  {
      "title": "meta[name='citation_title']",
      "author": "meta[name='citation_author']", 
      "author_institution": "meta[name='citation_author_institution']",
      "author_orcid": "meta[name='citation_author_orcid']",
      "author_email": "meta[name='citation_author_email']",
      "authors": "meta[name='citation_authors']",
      "journal_title": "meta[name='citation_journal_title']",
      "journal_abbrev": "meta[name='citation_journal_abbrev']",
      "conference_title": "meta[name='citation_conference_title']",
      "publisher": "meta[name='citation_publisher']",
      "issue": "meta[name='citation_issue']",
      "volume": "meta[name='citation_volume']",
      "doi": "meta[name='citation_doi']",
      "id": "meta[name='citation_id']",
      "id_from_sass_path": "meta[name='citation_id_from_sass_path']",
      "collection_id": "meta[name='citation_collection_id']",
      "pmid": "meta[name='citation_pmid']",
      "mjid": "meta[name='citation_mjid']",
      "firstpage": "meta[name='citation_firstpage']",
      "lastpage": "meta[name='citation_lastpage']",
      "date": "meta[name='citation_date']",
      "year": "meta[name='citation_year']",
      "publication_date": "meta[name='citation_publication_date']",
      "online_date": "meta[name='citation_online_date']",
      "price": "meta[name='citation_price']",
      "abstract_html_url": "meta[name='citation_abstract_html_url']",
      "abstract_pdf_url": "meta[name='citation_abstract_pdf_url']",
      "fulltext_html_url": "meta[name='citation_fulltext_html_url']",
      "public_url": "meta[name='citation_public_url']",
      "fulltext_world_readable": "meta[name='citation_fulltext_world_readable']",
      "isbn": "meta[name='citation_isbn']",
      "issn": "meta[name='citation_issn']",
      "language": "meta[name='citation_language']",
      "keywords": "meta[name='citation_keywords']",
      "dissertation_institution": "meta[name='citation_dissertation_institution']",
      "technical_report_institution": "meta[name='citation_technical_report_institution']",
      "technical_report_number": "meta[name='citation_technical_report_number']",
      "section": "meta[name='citation_section']",
      "reference": "meta[name='citation_reference']"
  },
  {
    "title": "meta[name='dc.Title']",
    "creator": "meta[name='dc.Creator']",
    "subject": "meta[name='dc.Subject']",
    "description": "meta[name='dc.Description']",
    "publisher": "meta[name='dc.Publisher']",
    "date": "meta[name='dc.Date']",
    "type": "meta[name='dc.Type']",
    "format": "meta[name='dc.Format']",
    "identifier_doi": "meta[name='dc.Identifier'][scheme='doi']",
    "identifier_publisher": "meta[name='dc.Identifier'][scheme='publisher-id']",
    "language": "meta[name='dc.Language']",
    "coverage": "meta[name='dc.Coverage']",
    "keywords": "meta[name='keywords']",
    "schema": "link[rel='schema.DC']"
  }
]

function extractMetadata(metadataSchemas) {
  console.log('extracting metadata...');
  const metadata = {};
  
  for (const schema of metadataSchemas) {
    // Track the schema type to prevent field collisions
    const schemaType = schema.title.includes('citation_') ? 'citation' : 'dc';
    
    for (const field in schema) {
      const selector = schema[field];
      const elements = document.querySelectorAll(selector);
      
      if (elements.length > 0) {
        // Handle multiple elements if they exist
        const values = Array.from(elements).map(el => 
          el.getAttribute('content') ||
          el.getAttribute('href') ||
          el.textContent.trim()
        ).filter(Boolean);  // Remove any null/undefined/empty values
        
        const fieldName = `${schemaType}_${field}`;
        metadata[fieldName] = values.length === 1 ? values[0] : values;
      }
    }
  }
  
  return metadata;
}

// Check if DOM contains, extract
metadata = extractMetadata(metadataSchemas);
console.log('dupin found:', metadata);

// Save to... localStorage? maybe?

// Inject a badge: Dupin saw this