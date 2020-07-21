from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import *
import json
import os
import datetime
from flask_migrate import Migrate



# database_path = 'postgres://az@localhost:5432/testapp'
database_path = os.environ['DATABASE_URL']

db = SQLAlchemy()

def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    migrate = Migrate(app, db)
    db.init_app(app)
    db.create_all()

class Movies(db.Model):
   __tablename__ = 'movies'

   id = Column(Integer, primary_key=True)
   title = Column(String())
   release_date = Column(DateTime, default=datetime.datetime.utcnow)


   def __init__(self, title, release_date):
      self.title = title
      self.release_date = release_date
      # self.actors_id = actors_id
   
   def insert(self):
      db.session.add(self)
      db.session.commit()
   
   def delete(self):
      db.session.delete(self)
      db.session.commit()

   def update(self):
      db.session.commit()

   def format(self):
      return {
         'id': self.id,
         'title': self.title,
         'release_date': self.release_date,
      }

class Actors(db.Model):
   id = Column(Integer, primary_key=True)
   name = Column(String())
   age = Column(Integer)
   gender = Column(String())



   def __init__(self, name, age, gender):
      self.name = name
      self.age = age
      self.gender = gender
   
   def insert(self):
      db.session.add(self)
      db.session.commit()

   def delete(self):
      db.session.delete(self)
      db.session.commit()

   def update(self):
      db.session.commit()
   
   def format(self):
      return {
         'id': self.id,
         'name': self.name,
         'age': self.age,
         'gender': self.gender
      }