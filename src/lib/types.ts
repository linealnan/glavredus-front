// API Types (OpenAPI spec)

export interface SearchRequest {
  query: string
}

export interface SearchResultItem {
  id: string
  group_id: string
  group_name: string
  text: string
  url: string
}

export interface SearchResponse {
  error?: string
  results: SearchResultItem[]
  total: number
}