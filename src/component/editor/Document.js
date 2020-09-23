import Text from './Text';


class Document
{
  constructor()
  {
    const text = new Text();

    const bounding =
      {
        left:   0,
        top:    0,
        right:  800,
        bottom: 0
      };

    const font =
      {
        family: 'courier',
        height: 32
      };

    text.set({ bounding, color: '#000000', font });

    this._children = [text];  // 至少存在一个对象
  }

  child(path)
  {
    return this._children[path];
  }

  length()
  {
    return this._children.reduce((a, c) => a + c.length(), 0);
  }

  mutate(renderer, { begin, end }, text)
  {
    this._children[0].mutate(renderer, { begin, end }, text);
  }

  location_backward(location, steps)
  {
    return this._children[0].location_backward(location, steps);
  }

  location_forward(location, steps)
  {
    return this._children[0].location_forward(location, steps);
  }

  draw(renderer)
  {
    for (const object of this._children)
    {
      object.draw(renderer);
    }
  }
}


export default Document;
