//palabras clave
SELECT DISTINCT ?keyword WHERE {
    ?dataset <http://www.w3.org/ns/dcat#keyword> ?keyword.
  }

  
  //categorias
  SELECT DISTINCT ?theme WHERE {
    ?dataset <http://www.w3.org/ns/dcat#theme> ?theme.
  }

  
  //entidades
  SELECT DISTINCT ?publisher WHERE {
    ?dataset <http://purl.org/dc/terms/publisher> ?publisher.
  }

  //periodicidad puede que no funcione
  SELECT DISTINCT ?periodicity WHERE {
    ?dataset <http://purl.org/dc/terms/accrualPeriodicity> ?periodicity.
  }


  //regiones
  SELECT DISTINCT ?location WHERE {
    ?dataset <http://purl.org/dc/terms/spatial> ?location.
  }