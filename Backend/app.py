from flask import Flask, jsonify, request
from datetime import datetime
from git import Repo

app = Flask(__name__)


def update_git():
    if (repo.is_dirty()):
        for remote in repo.remotes:
            remote.pull()


def verify_user(name, email):
    with repo.config_reader() as git_config:
        user_email = git_config.get_value('user', 'email')
        user_name = git_config.get_value('user', 'name')
        return user_email == email and user_name == name


def commit_changes(project, name, msg):
    repo.git.add('./'+project+'/'+name+'.txt')
    repo.index.commit(msg)
    origin = repo.remote(name='origin')
    origin.push()


@app.route('/get', methods=['GET'])
def get_url():
    return jsonify({'link': 'https://github.com/ras-ufcg/PunchClock_RAS'})


@app.route('/setup/<user_name>/<user_email>/', methods=['POST'])
def setup(user_name, user_email):
    if not verify_user(user_name, user_email):
        with repo.config_writer() as git_config:
            git_config.set_value('user', 'email', user_email)
            git_config.set_value('user', 'name', user_name)
    return jsonify({'status': 'ok',
                    'message': 'User ' + user_name + ' successfully setup'})


@app.route('/start/<name>/<project>/', methods=['PUT'])
def start_hour(name, project):
    update_git()

    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    current_day = datetime.today().strftime('%Y-%m-%d')

    f = open('./'+project+'/'+name+'.txt', 'a+')
    text = current_day+" : "+current_time+" - "
    msg = "In registred for "+name+" at "+current_day+" - "+current_time
    f.write(text)

    commit_changes(project, name, msg)

    return jsonify({'status': 'ok',
                    'message': 'User ' + name + ' successfully started'})


@app.route('/end/<name>/<project>/', methods=['PUT'])
def end_hour(name, project, task):
    update_git()

    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    current_day = datetime.today().strftime('%Y-%m-%d')

    f = open('./'+project+'/'+name+'.txt', 'a+')
    text = current_time+" >> "+task+"\n"
    msg = "Punch created for "+name+" at "+current_day+" - "+current_time
    f.write(text)

    commit_changes(project, name, msg)

    return jsonify({'status': 'ok',
                    'message': 'User ' + name + ' successfully ended'})


repo = Repo('E:\Developer\Punch Clock')
update_git()
