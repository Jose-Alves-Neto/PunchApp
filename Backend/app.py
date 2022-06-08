from flask import Flask, jsonify, request
from datetime import datetime
import os
from git import Repo
import sys
import argparse

app = Flask(__name__)

repo = Repo('E:\Developer\Punch Clock')
update_git()

now = datetime.now()
current_time = now.strftime("%H:%M:%S")
current_day = datetime.today().strftime('%Y-%m-%d')

# f = open('./OpenBot/'+name+'.txt','a+')
# f.write(text)
# f.close()
# print(msg)

# PATH_OF_GIT_REPO = myfolder+'/.git'  # make sure .git folder is properly configured
# repo = Repo(PATH_OF_GIT_REPO)
# repo.git.add('./OpenBot/'+name+'.txt')
# repo.index.commit(msg)
# origin = repo.remote(name='origin')
# origin.push()
def update_git():
  if (repo.is_dirty()):
    for remote in repo.remotes:
      remote.pull()


def verify_user(name, email):
  with repo.config_reader() as git_config:
    user_email = git_config.get_value('user', 'email')
    user_name = git_config.get_value('user', 'name')
    return user_email == email and user_name == name


def commit_changes(progect, name, msg):
  repo.git.add('./'+project+'/'+name+'.txt')
  repo.index.commit(msg)
  origin = repo.remote(name='origin')
  origin.push()


@app.route('/', methods=['POST'])
def setup(user_name, user_email):
  if not verify_user(user_name, user_email):
    with repo.config_writer() as git_config:
      git_config.set_value('user', 'email', user_email)
      git_config.set_value('user', 'name', user_name)

    
@app.route('/', methods=['PUT'])
def start_hour(name, project):
  update_git()
  f = open('./'+project+'/'+name+'.txt','a+')
  text = current_day+" : "+current_time+" - "
  msg = "In registred for "+name+" at "+current_day+" - "+current_time
  f.write(text)
  commit_changes(project, name, msg)
  

@app.route('/', methods=['PUT'])')  
def end_hour(name, task):
  update_git()
  f = open('./'+project+'/'+name+'.txt','a+')
  text = current_time+" >> "+task+"\n"
  msg = "Punch created for "+name+" at "+current_day+" - "+current_time
  f.write(text)
  commit_changes(project, name, msg)

