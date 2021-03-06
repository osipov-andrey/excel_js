import {$} from '@core/dom';

export function resize($root, event) {
  const resizer = event.target.dataset.resize
  if (resizer) {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coordinates = $parent.getCoordinates()
    const sideProp = resizer === 'col' ? 'bottom' : 'right'
    let value

    $resizer.setCss({
      opacity: 1,
      [sideProp]: '-5000px',
    })

    if (resizer === 'col') {
      document.onmousemove = e => {
        const delta = e.pageX - coordinates.right
        value = (coordinates.width + delta) + 'px'
        $resizer.setCss({
          right: -delta + 'px',
        })
      }
    } else if (resizer === 'row') {
      document.onmousemove = e => {
        const delta = e.pageY - coordinates.bottom
        value = (coordinates.height + delta) + 'px'
        $resizer.setCss({
          bottom: -delta + 'px',
        })
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      if (resizer === 'col') {
        const colNumber = $parent.data.col
        const cells = $root.findAll(`[data-col="${colNumber}"]`)
        $parent.setCss({width: value})
        cells.forEach(el => $(el).setCss({width: value}))
        $resizer.setCss({
          right: 0,
        })
      } else if (resizer === 'row') {
        $parent.setCss({height: value})
        $resizer.setCss({
          bottom: 0,
        })
      }
      $resizer.setCss({
        opacity: 0,
        [sideProp]: 0,
      })
    }
  }
}
