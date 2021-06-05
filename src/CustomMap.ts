// Instructions to every other class on how they can be an argument to 'AddMarker'
export interface Mappable{
  location: {
    lat: number;
    lng: number,
  };
  markerContent(): string;
}


export class CustomMap {
  // Properties
  private googleMap: google.maps.Map;

  constructor( mapDiv: string ){
    this.googleMap = new google.maps.Map( document.getElementById( mapDiv ), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0,
      }
    });
  }

  AddMarker( mappable: Mappable ){
    const marker = new google.maps.Marker( {
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      }
    });

    marker.addListener( 'click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent( ),
      });

      infoWindow.open( this.googleMap, marker );
    });
  }

}