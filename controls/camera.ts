import * as yo from 'yo-yo'
import * as css from 'dom-css'

export function image_control(src:string){
  var image = yo`
    <div>
      <img src="${src}"/>
    </div>
  `;
  css(image, {
    "display":"inline-block",
    "width":"350px",
    "height":"350px",
    "border":"solid thin gray"
  })

  return image;
}
