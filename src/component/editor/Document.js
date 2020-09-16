import Location from './Location';

import Text from './Text';


class Document
{
  constructor()
  {
    const text = new Text();

    text.set({ baseline: 32, font: { family: 'courier', height: 32 }, color: '#000000' });

    this._children = [text];  // 至少存在一个对象
  }

  child(index)
  {
    return this._children[index];
  }

  mutate({ begin, end }, text)
  {
    // console.log(begin.path(), begin.offset());
    // console.log(  end.path(),   end.offset());

    // console.log(text);

    if (Location.compare(begin, end) !== 0)
    {
      // 删掉 begin 和 end 之间的对象或字符
      ;
    }
    else
    {
      const location = begin;

      const object = this._children[location.path()];

      const offset = location.offset();

      object.mutate({ begin: offset, end: offset }, text);

      // 判断当前 object 是否越过边界，产生新的对象
      ;
    }
  }

  location_backward(location, steps)
  {
    let index  = location.path();
    let offset = location.offset();

    let object = this._children[index];

    while (true)
    {
      if (steps < offset)
      {
        offset -= steps;

        return Location.create(index, offset);
      }

      if (index - 1 < 0)
      {
        return Location.create(0, 0);
      }

      index -= 1;

      steps -= offset;

      object = this._children[index];

      offset = object.length();
    }
  }

  location_forward(location, steps)
  {
    let index  = location.path();
    let offset = location.offset();

    let object = this._children[index];

    while (true)
    {
      if (offset + steps <= object.length())
      {
        offset += steps;

        return Location.create(index, offset);
      }

      if (index + 1 >= this._children.length)
      {
        return Location.create(index, object.length());
      }

      index += 1;

      steps -= object.length() - offset;

      object = this._children[index];

      offset = 0;
    }
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
