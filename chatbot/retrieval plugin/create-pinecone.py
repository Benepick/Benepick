import pinecone      

pinecone.init(      
	api_key='47f6eee2-71cd-4d3d-bf46-72dbe6987ffe',      
	environment='gcp-starter'      
)      

pinecone.create_index(name='retrieval-plugin',
                      dimension=1536,
                      metric='cosine',
                      metadata_config={
                          "indexed": ['source', 'source_id', 'url', 'created_at', 'author', 'document_id']})

print(index)
