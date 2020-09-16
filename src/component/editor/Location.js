class Location
{
  constructor()
  {
    this._path   = 0;
    this._offset = 0;
  }

  assign(object)
  {
    this._path   = object._path;
    this._offset = object._offset;
  }

  path()
  {
    return this._path;
  }

  offset()
  {
    return this._offset;
  }
}

Location.create = function (path, offset)
{
  const instance = new Location();

  instance._path   = path;
  instance._offset = offset;

  return instance;
};

Location.clone = function (object)
{
  const instance = new Location();

  instance._path   = object._path;
  instance._offset = object._offset;

  return instance;
};

Location.compare = function (left, right)
{
  if (left._path !== right._path)
  {
    return left._path < right._path ? -1 : 1;
  }

  if (left._offset !== right._offset)
  {
    return left._offset < right._offset ? -1 : 1;
  }

  return 0;
};


export default Location;
